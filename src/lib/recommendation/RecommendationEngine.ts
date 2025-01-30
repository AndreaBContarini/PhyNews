import { TfIdf, TfIdfTerm } from 'natural';

interface UserPreferences {
  categories: { [key: string]: number };
  authors: { [key: string]: number };
  keywords: string[];
  weights: {
    category: number;
    author: number;
    keyword: number;
    content: number;
  };
}

interface Article {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  categories: string[];
}

export class RecommendationEngine {
  private tfidf: TfIdf;

  constructor() {
    this.tfidf = new TfIdf();
  }

  // Calcola la similarità di Jaccard tra due set
  private jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }

  // Calcola la similarità del coseno tra due vettori TF-IDF
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  // Calcola il punteggio di categoria usando la similarità di Jaccard
  private calculateCategoryScore(
    articleCategories: string[],
    userPreferences: UserPreferences
  ): number {
    const userCategorySet = new Set(Object.keys(userPreferences.categories));
    const articleCategorySet = new Set(articleCategories);
    
    const similarity = this.jaccardSimilarity(userCategorySet, articleCategorySet);
    
    // Pesa la similarità in base alla frequenza di visita delle categorie
    let weightedScore = 0;
    articleCategories.forEach(category => {
      if (userPreferences.categories[category]) {
        weightedScore += userPreferences.categories[category];
      }
    });

    return (similarity + weightedScore / Object.keys(userPreferences.categories).length) / 2;
  }

  // Calcola il punteggio degli autori
  private calculateAuthorScore(
    authors: string[],
    userPreferences: UserPreferences
  ): number {
    let score = 0;
    authors.forEach(author => {
      if (userPreferences.authors[author]) {
        score += userPreferences.authors[author];
      }
    });
    return score / Math.max(...Object.values(userPreferences.authors), 1);
  }

  // Calcola il punteggio delle keyword usando TF-IDF e cosine similarity
  private calculateKeywordScore(
    text: string,
    userPreferences: UserPreferences
  ): number {
    this.tfidf.addDocument(text);
    const textVector = this.tfidf.listTerms(0)
      .map((item: TfIdfTerm) => item.tfidf);
    
    // Crea un documento con le keyword dell'utente
    const userKeywords = userPreferences.keywords.join(' ');
    this.tfidf.addDocument(userKeywords);
    const userVector = this.tfidf.listTerms(1)
      .map((item: TfIdfTerm) => item.tfidf);

    // Rimuovi i documenti per il prossimo calcolo
    this.tfidf.documents.length = 0;

    return this.cosineSimilarity(textVector, userVector);
  }

  // Calcola il punteggio di un articolo
  public calculateArticleScore(
    article: Article,
    userPreferences: UserPreferences,
    isLiked: boolean = false
  ): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;

    // 1. Category Score (30%)
    const categoryScore = this.calculateCategoryScore(article.categories, userPreferences);
    score += categoryScore * userPreferences.weights.category;
    if (categoryScore > 0.3) {
      reasons.push('Category match');
    }

    // 2. Author Score (30%)
    const authorScore = this.calculateAuthorScore(article.authors, userPreferences);
    score += authorScore * userPreferences.weights.author;
    if (authorScore > 0.3) {
      reasons.push('Author match');
    }

    // 3. Keyword Score (Title) (20%)
    const titleScore = this.calculateKeywordScore(article.title, userPreferences);
    score += titleScore * userPreferences.weights.keyword * 0.5;
    if (titleScore > 0.3) {
      reasons.push('Title keyword match');
    }

    // 4. Content Score (Abstract) (20%)
    const abstractScore = this.calculateKeywordScore(article.abstract, userPreferences);
    score += abstractScore * userPreferences.weights.content;
    if (abstractScore > 0.3) {
      reasons.push('Content match');
    }

    // 5. Penalizzazione articoli già piaciuti (50% invece che esclusione)
    if (isLiked) {
      score *= 0.5;
      reasons.push('Previously liked');
    }

    return {
      score: Math.min(score, 1), // Normalizza il punteggio tra 0 e 1
      reasons
    };
  }

  // Aggiorna i pesi delle feature in base alle interazioni dell'utente
  public updateFeatureWeights(
    userPreferences: UserPreferences,
    interactions: {
      categoryClicks: { [key: string]: number };
      authorClicks: { [key: string]: number };
      keywordSuccess: number;
      contentSuccess: number;
    }
  ): UserPreferences {
    const totalInteractions = Object.values(interactions.categoryClicks).reduce((a, b) => a + b, 0) +
                            Object.values(interactions.authorClicks).reduce((a, b) => a + b, 0) +
                            interactions.keywordSuccess +
                            interactions.contentSuccess;

    if (totalInteractions === 0) return userPreferences;

    const newWeights = {
      category: Math.max(0.2, Object.values(interactions.categoryClicks).reduce((a, b) => a + b, 0) / totalInteractions),
      author: Math.max(0.2, Object.values(interactions.authorClicks).reduce((a, b) => a + b, 0) / totalInteractions),
      keyword: Math.max(0.1, interactions.keywordSuccess / totalInteractions),
      content: Math.max(0.1, interactions.contentSuccess / totalInteractions)
    };

    // Normalizza i pesi per assicurarsi che la somma sia 1
    const sum = Object.values(newWeights).reduce((a, b) => a + b, 0);
    Object.keys(newWeights).forEach(key => {
      newWeights[key as keyof typeof newWeights] /= sum;
    });

    return {
      ...userPreferences,
      weights: newWeights
    };
  }
} 
