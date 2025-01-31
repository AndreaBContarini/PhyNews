import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Brain, BookOpen, Users, Tag, Heart, History } from 'lucide-react';

interface UserPreferences {
  topCategories: { category: string; count: number }[];
  favoriteAuthors: { author: string; count: number }[];
  topSubjects: { subject: string; count: number }[];
  readingHistory: {
    articleId: string;
    title: string;
    timestamp: string;
    timeSpent: number;
  }[];
  likedArticles: {
    articleId: string;
    title: string;
    timestamp: string;
  }[];
}

interface RecommendedArticle {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  category: string;
  score: number;
  matchReason: string;
}

export default function Preferences() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      loadUserPreferences(user.id);
      loadRecommendations(user.id);
    };

    checkAuth();
  }, [navigate]);

  const loadUserPreferences = async (userId: string) => {
    try {
      // Carica le categorie più visitate
      const { data: categories } = await supabase
        .from('article_views')
        .select('category')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      // Carica gli autori degli articoli piaciuti
      const { data: likedAuthors } = await supabase
        .from('article_likes')
        .select('authors')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      // Analizza e aggrega i dati
      const topCategories = analyzeFrequency(categories?.map(c => c.category) || []);
      const favoriteAuthors = analyzeAuthors(likedAuthors?.map(a => a.authors).flat() || []);

      setPreferences({
        topCategories,
        favoriteAuthors,
        topSubjects: [], // To be implemented
        readingHistory: [], // To be implemented
        likedArticles: [] // To be implemented
      });
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const loadRecommendations = async (userId: string) => {
    try {
      // 1. Carica la cronologia di lettura dell'utente
      const { data: readingHistory } = await supabase
        .from('article_views')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      // 2. Carica gli articoli piaciuti
      const { data: likedArticles } = await supabase
        .from('article_likes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!readingHistory || !likedArticles) return;

      // 3. Estrai le caratteristiche principali
      const features = extractFeatures(readingHistory, likedArticles);

      // 4. Carica articoli recenti da arXiv per il confronto
      const recentArticles = await fetchRecentArxivArticles(features.topCategories);

      // 5. Calcola i punteggi di similarità e genera raccomandazioni
      const recommendedArticles = generateRecommendations(
        recentArticles,
        features,
        likedArticles
      );

      setRecommendations(recommendedArticles);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeFrequency = (items: string[]) => {
    const frequency: { [key: string]: number } = {};
    items.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
    return Object.entries(frequency)
      .map(([item, count]) => ({ category: item, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const analyzeAuthors = (authors: string[]) => {
    const frequency: { [key: string]: number } = {};
    authors.forEach(author => {
      frequency[author] = (frequency[author] || 0) + 1;
    });
    return Object.entries(frequency)
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const extractFeatures = (readingHistory: any[], likedArticles: any[]) => {
    // Estrai e analizza le caratteristiche degli articoli che interessano all'utente
    const categories = readingHistory.map(h => h.category);
    const authors = likedArticles.flatMap(a => a.authors);
    const titles = [...readingHistory, ...likedArticles].map(a => a.title);

    return {
      topCategories: analyzeFrequency(categories),
      topAuthors: analyzeAuthors(authors),
      keywords: extractKeywords(titles)
    };
  };

  const extractKeywords = (titles: string[]) => {
    // Implementa l'estrazione delle parole chiave dai titoli
    const words = titles.join(' ').toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .filter(word => !['and', 'the', 'for', 'with'].includes(word));

    return analyzeFrequency(words)
      .map(k => ({ ...k, keyword: k.category }))
      .slice(0, 10);
  };

  const fetchRecentArxivArticles = async (topCategories: { category: string; count: number }[]) => {
    // Implementa la fetch degli articoli recenti da arXiv per le categorie più rilevanti
    const articles: any[] = [];
    for (const { category } of topCategories.slice(0, 3)) {
      const response = await fetch(
        `http://export.arxiv.org/api/query?search_query=cat:${category}&start=0&max_results=100&sortBy=submittedDate&sortOrder=descending`
      );
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const entries = xmlDoc.getElementsByTagName('entry');

      articles.push(...Array.from(entries).map(entry => ({
        id: entry.getElementsByTagName('id')[0]?.textContent || '',
        title: entry.getElementsByTagName('title')[0]?.textContent?.trim() || '',
        authors: Array.from(entry.getElementsByTagName('author')).map(
          author => author.getElementsByTagName('name')[0]?.textContent || ''
        ),
        abstract: entry.getElementsByTagName('summary')[0]?.textContent?.trim() || '',
        category
      })));
    }
    return articles;
  };

  const generateRecommendations = (
    articles: any[],
    features: any,
    likedArticles: any[]
  ): RecommendedArticle[] => {
    return articles.map(article => {
      let score = 0;
      let matchReasons: string[] = [];
          // Start of Selection

          // 1. Category match
          const categoryMatch = features.topCategories.find((c: { category: string; count: number }) => c.category === article.category);
          if (categoryMatch) {
            score += (categoryMatch.count / features.topCategories[0].count) * 0.3;
            matchReasons.push('Category match');
          }

      // 2. Author match
      const authorMatch = article.authors.some(author =>
        features.topAuthors.some(a => a.author === author)
      );
      if (authorMatch) {
        score += 0.3;
        matchReasons.push('Author match');
      }

      // 3. Keyword match
      const titleWords = article.title.toLowerCase().split(/\W+/);
      const keywordMatches = features.keywords.filter(k =>
        titleWords.includes(k.keyword)
      ).length;
      score += (keywordMatches / features.keywords.length) * 0.2;
      if (keywordMatches > 0) {
        matchReasons.push('Keyword match');
      }

      // 4. Abstract similarity
      const abstractMatch = features.keywords.some(k =>
        article.abstract.toLowerCase().includes(k.keyword)
      );
      if (abstractMatch) {
        score += 0.2;
        matchReasons.push('Content match');
      }

      // 5. Penalize already liked articles
      if (likedArticles.some(liked => liked.article_id === article.id)) {
        score = 0;
      }

      return {
        ...article,
        score,
        matchReason: matchReasons.join(', ')
      };
    })
    .filter(article => article.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Your Research Profile</h1>

        {loading ? (
          <div className="text-center py-12">Loading your preferences...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Preferences Section */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Tag className="w-6 h-6 mr-2 text-blue-500" />
                  Top Categories
                </h2>
                <div className="space-y-2">
                  {preferences?.topCategories.map((cat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{cat.category}</span>
                      <span className="text-blue-500">{cat.count} views</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-purple-500" />
                  Favorite Authors
                </h2>
                <div className="space-y-2">
                  {preferences?.favoriteAuthors.map((author, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{author.author}</span>
                      <span className="text-purple-500">{author.count} likes</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-green-500" />
                Recommended for You
              </h2>
              <div className="space-y-4">
                {recommendations.map((article, index) => (
                  <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="font-medium mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {article.authors.join(', ')}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-400">{article.category}</span>
                      <span className="text-green-400">{article.matchReason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 