import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Heart } from 'lucide-react';

interface ArxivArticle {
  title: string;
  authors: string[];
  abstract: string;
  published: string;
  id: string;
  conclusions: string | null;
  pdfUrl: string;
  isLiked?: boolean;
}

export default function PhysicsCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArxivArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArxivArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingConclusions, setLoadingConclusions] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());

  // Mappa delle categorie con i rispettivi codici arXiv
  const categoryToArxivCode: { [key: string]: string } = {
    // Physics categories
    'galaxies': 'astro-ph.GA',
    'cosmology': 'astro-ph.CO',
    'earth-planetary': 'astro-ph.EP',
    'high-energy': 'astro-ph.HE',
    'instrumentation': 'astro-ph.IM',
    'solar-stellar': 'astro-ph.SR',
    // CS categories
    'ai': 'cs.AI',
    'cl': 'cs.CL',
    'cc': 'cs.CC',
    'ce': 'cs.CE',
    'cg': 'cs.CG',
    'gt': 'cs.GT',
    'cv': 'cs.CV',
    'cy': 'cs.CY',
    'cr': 'cs.CR',
    'ds': 'cs.DS',
    'db': 'cs.DB',
    'dl': 'cs.DL',
    'dm': 'cs.DM',
    'dc': 'cs.DC',
    'et': 'cs.ET',
    'fl': 'cs.FL',
    'gl': 'cs.GL',
    'gr': 'cs.GR',
    'ar': 'cs.AR',
    'hc': 'cs.HC',
    'ir': 'cs.IR',
    'it': 'cs.IT',
    'lo': 'cs.LO',
    'lg': 'cs.LG',
    'ms': 'cs.MS',
    'ma': 'cs.MA',
    'mm': 'cs.MM',
    'ni': 'cs.NI',
    'ne': 'cs.NE',
    'na': 'cs.NA',
    'os': 'cs.OS',
    'oh': 'cs.OH',
    'pf': 'cs.PF',
    'pl': 'cs.PL',
    'ro': 'cs.RO',
    'si': 'cs.SI',
    'se': 'cs.SE',
    'sd': 'cs.SD',
    'sc': 'cs.SC',
    'sy': 'cs.SY'
  };

  // Funzione per formattare il testo con LaTeX
  const formatText = (text: string) => {
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const latex = part.slice(1, -1);
        return <InlineMath key={index}>{latex}</InlineMath>;
      }
      return part;
    });
  };

  // Funzione per pulire il testo da caratteri LaTeX
  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/\$[^$]+\$/g, '') // Rimuove le formule LaTeX
      .replace(/\s+/g, ' ')      // Normalizza gli spazi
      .trim();
  };

  // Funzione per la lettura del testo
  const readText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Ferma qualsiasi lettura in corso
      window.speechSynthesis.cancel();

      // Funzione per aggiungere pause naturali nel testo
      const addNaturalPauses = (text: string) => {
        return text
          .replace(/\./g, '... ') // Pausa più lunga dopo i punti
          .replace(/,/g, ', ') // Pausa breve dopo le virgole
          .replace(/\(/g, '... (') // Pausa prima delle parentesi
          .replace(/\)/g, ')... ') // Pausa dopo le parentesi
          .replace(/:/g, '... ') // Pausa dopo i due punti
          .replace(/;/g, '... ') // Pausa dopo il punto e virgola
          .replace(/\n/g, '... ') // Pausa tra i paragrafi
          .replace(/\s+/g, ' ') // Normalizza gli spazi
          .trim();
      };

      const cleanedText = cleanTextForSpeech(text);
      const textWithPauses = addNaturalPauses(cleanedText);
      const utterance = new SpeechSynthesisUtterance(textWithPauses);
      
      // Carica le voci disponibili
      const voices = window.speechSynthesis.getVoices();
      
      // Cerca una voce femminile americana di alta qualità
      const americanFemaleVoice = voices.find(
        voice => 
          voice.name === 'Samantha' ||
          voice.name === 'Google US Female' ||
          (voice.name.includes('Female') && voice.lang.startsWith('en-US'))
      );

      if (americanFemaleVoice) {
        utterance.voice = americanFemaleVoice;
      }

      // Imposta la lingua in inglese americano
      utterance.lang = 'en-US';
      
      // Ottimizza i parametri per una voce più naturale
      utterance.pitch = 1.1;     // Leggermente più alto per una voce più chiara
      utterance.rate = 0.85;     // Velocità ridotta per maggiore chiarezza
      utterance.volume = 1;      // Volume massimo

      // Aggiungi variazioni prosodiche per rendere la voce più espressiva
      const sentences = textWithPauses.split('...');
      let currentIndex = 0;

      const speakNextSentence = () => {
        if (currentIndex < sentences.length) {
          const currentSentence = sentences[currentIndex];
          const sentenceUtterance = new SpeechSynthesisUtterance(currentSentence);
          
          // Copia le impostazioni base
          sentenceUtterance.voice = utterance.voice;
          sentenceUtterance.lang = utterance.lang;
          
          // Varia leggermente il tono e la velocità per ogni frase
          sentenceUtterance.pitch = 1.1 + (Math.random() * 0.2 - 0.1); // Variazione del tono
          sentenceUtterance.rate = 0.85 + (Math.random() * 0.1 - 0.05); // Variazione della velocità
          
          sentenceUtterance.onend = () => {
            currentIndex++;
            setTimeout(speakNextSentence, 300); // Pausa tra le frasi
          };
          
          window.speechSynthesis.speak(sentenceUtterance);
        } else {
          setIsReading(false);
        }
      };

      // Eventi per gestire lo stato della lettura
      setIsReading(true);

      // Aggiungiamo un listener per assicurarci che le voci siano caricate
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          const updatedAmericanFemaleVoice = updatedVoices.find(
            voice => 
              voice.name === 'Samantha' ||
              voice.name === 'Google US Female' ||
              (voice.name.includes('Female') && voice.lang.startsWith('en-US'))
          );
          if (updatedAmericanFemaleVoice) {
            utterance.voice = updatedAmericanFemaleVoice;
          }
          speakNextSentence();
        });
      } else {
        speakNextSentence();
      }
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  // Funzione per fermare la lettura
  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  // Funzione per estrarre le conclusioni
  const fetchConclusions = async (article: ArxivArticle) => {
    setLoadingConclusions(true);
    try {
      // Estrai l'ID dell'articolo dall'URL
      const arxivId = article.id.split('/').pop()?.split('v')[0];
      const htmlUrl = `https://arxiv.org/html/${arxivId}`;
      
      const response = await fetch(htmlUrl);
      const html = await response.text();
      
      // Creiamo un DOM parser per analizzare l'HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Cerchiamo la sezione delle conclusioni
      // Proviamo diversi possibili titoli di sezione
      const conclusionHeaders = [
        'Conclusions',
        'Conclusion',
        'Summary and Conclusions',
        'Summary and Discussion',
        'Discussion and Conclusions',
        'Final Remarks'
      ];
      
      let conclusionSection = null;
      
      // Cerca le intestazioni che contengono una delle parole chiave
      const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      for (const header of headers) {
        if (conclusionHeaders.some(title => 
          header.textContent?.toLowerCase().includes(title.toLowerCase())
        )) {
          // Prendi tutto il testo fino alla prossima intestazione o alla fine della sezione
          let content = '';
          let currentNode = header.nextElementSibling;
          
          while (currentNode && !currentNode.matches('h1, h2, h3, h4, h5, h6')) {
            content += currentNode.textContent + ' ';
            currentNode = currentNode.nextElementSibling;
          }
          
          conclusionSection = content.trim();
          break;
        }
      }
      
      const conclusions = conclusionSection || "Non siamo riusciti a trovare la sezione delle conclusioni in questo articolo.";
      
      setArticles(prevArticles => 
        prevArticles.map(a => 
          a.id === article.id ? { ...a, conclusions } : a
        )
      );
    } catch (err) {
      console.error('Error fetching conclusions:', err);
      setError('Failed to fetch conclusions. The article might not be available in HTML format.');
    } finally {
      setLoadingConclusions(false);
    }
  };

  // Funzione per gestire il like di un articolo
  const handleLikeArticle = async (articleId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const isCurrentlyLiked = likedArticles.has(articleId);
      
      if (isCurrentlyLiked) {
        // Rimuovi il like
        await supabase
          .from('article_likes')
          .delete()
          .match({ user_id: user.id, article_id: articleId });
        
        setLikedArticles(prev => {
          const newSet = new Set(prev);
          newSet.delete(articleId);
          return newSet;
        });
      } else {
        // Aggiungi il like e salva le features dell'articolo
        const article = articles.find(a => a.id === articleId);
        if (!article) return;

        await supabase.from('article_likes').insert({
          user_id: user.id,
          article_id: articleId,
          category: categoryId,
          title: article.title,
          authors: article.authors,
          abstract: article.abstract,
          timestamp: new Date().toISOString()
        });

        setLikedArticles(prev => new Set([...prev, articleId]));
      }
    } catch (error) {
      console.error('Error handling article like:', error);
    }
  };

  // Carica i like dell'utente all'avvio
  useEffect(() => {
    const loadUserLikes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: likes } = await supabase
        .from('article_likes')
        .select('article_id')
        .eq('user_id', user.id);

      if (likes) {
        setLikedArticles(new Set(likes.map(like => like.article_id)));
      }
    };

    loadUserLikes();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchArxivArticles = async () => {
      const arxivCode = categoryToArxivCode[categoryId || ''];
      
      if (arxivCode) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://export.arxiv.org/api/query?search_query=cat:${arxivCode}&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending`
          );
          const data = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const entries = xmlDoc.getElementsByTagName('entry');

          const parsedArticles: ArxivArticle[] = Array.from(entries).map((entry) => {
            const authors = Array.from(entry.getElementsByTagName('author')).map(
              (author) => author.getElementsByTagName('name')[0]?.textContent || ''
            );
            
            return {
              title: entry.getElementsByTagName('title')[0]?.textContent?.trim() || '',
              authors,
              abstract: entry.getElementsByTagName('summary')[0]?.textContent?.trim() || '',
              published: entry.getElementsByTagName('published')[0]?.textContent || '',
              id: entry.getElementsByTagName('id')[0]?.textContent || '',
              conclusions: null,
              pdfUrl: '',
              isLiked: likedArticles.has(entry.getElementsByTagName('id')[0]?.textContent || '')
            };
          });

          setArticles(parsedArticles);
        } catch (err) {
          setError('Failed to fetch articles');
          console.error('Error fetching arXiv articles:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArxivArticles();
  }, [categoryId, likedArticles]);

  const handleArticleClick = (article: ArxivArticle) => {
    setSelectedArticle(selectedArticle?.id === article.id ? null : article);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12 text-center">
          Caricamento articoli...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12 text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {(() => {
              switch (categoryId) {
                // Physics categories
                case 'galaxies':
                  return 'Astrophysics of Galaxies';
                case 'cosmology':
                  return 'Cosmology and Nongalactic Astrophysics';
                case 'earth-planetary':
                  return 'Earth and Planetary Astrophysics';
                case 'high-energy':
                  return 'High Energy Astrophysical Phenomena';
                case 'instrumentation':
                  return 'Instrumentation and Methods for Astrophysics';
                case 'solar-stellar':
                  return 'Solar and Stellar Astrophysics';
                // CS categories
                case 'ai':
                  return 'Artificial Intelligence';
                case 'cl':
                  return 'Computation and Language';
                case 'cc':
                  return 'Computational Complexity';
                case 'ce':
                  return 'Computational Engineering, Finance, and Science';
                case 'cg':
                  return 'Computational Geometry';
                case 'gt':
                  return 'Computer Science and Game Theory';
                case 'cv':
                  return 'Computer Vision and Pattern Recognition';
                case 'cy':
                  return 'Computers and Society';
                case 'cr':
                  return 'Cryptography and Security';
                case 'ds':
                  return 'Data Structures and Algorithms';
                case 'db':
                  return 'Databases';
                case 'dl':
                  return 'Digital Libraries';
                case 'dm':
                  return 'Discrete Mathematics';
                case 'dc':
                  return 'Distributed, Parallel, and Cluster Computing';
                case 'et':
                  return 'Emerging Technologies';
                case 'fl':
                  return 'Formal Languages and Automata Theory';
                case 'gl':
                  return 'General Literature';
                case 'gr':
                  return 'Graphics';
                case 'ar':
                  return 'Hardware Architecture';
                case 'hc':
                  return 'Human-Computer Interaction';
                case 'ir':
                  return 'Information Retrieval';
                case 'it':
                  return 'Information Theory';
                case 'lo':
                  return 'Logic in Computer Science';
                case 'lg':
                  return 'Machine Learning';
                case 'ms':
                  return 'Mathematical Software';
                case 'ma':
                  return 'Multiagent Systems';
                case 'mm':
                  return 'Multimedia';
                case 'ni':
                  return 'Networking and Internet Architecture';
                case 'ne':
                  return 'Neural and Evolutionary Computing';
                case 'na':
                  return 'Numerical Analysis';
                case 'os':
                  return 'Operating Systems';
                case 'oh':
                  return 'Other Computer Science';
                case 'pf':
                  return 'Performance';
                case 'pl':
                  return 'Programming Languages';
                case 'ro':
                  return 'Robotics';
                case 'si':
                  return 'Social and Information Networks';
                case 'se':
                  return 'Software Engineering';
                case 'sd':
                  return 'Sound';
                case 'sc':
                  return 'Symbolic Computation';
                case 'sy':
                  return 'Systems and Control';
                default:
                  return categoryId?.toUpperCase();
              }
            })()}
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Latest research papers from arXiv
          </p>
        </div>

        {categoryToArxivCode && categoryToArxivCode[categoryId || ''] && (
          <div className="space-y-6">
            {articles.map((article) => (
              <div 
                key={article.id}
                className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div 
                    className="cursor-pointer flex-1"
                    onClick={() => handleArticleClick(article)}
                  >
                    <h2 className="text-xl font-semibold mb-2">{formatText(article.title)}</h2>
                    <p className="text-gray-400 mb-2">
                      {article.authors.join(', ')}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Published: {new Date(article.published).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeArticle(article.id);
                    }}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      likedArticles.has(article.id)
                        ? 'text-red-500 hover:bg-red-500/10'
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-700/50'
                    }`}
                  >
                    <Heart 
                      className={`w-6 h-6 ${
                        likedArticles.has(article.id) ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>
                
                {selectedArticle?.id === article.id && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-gray-700/50 rounded-lg animate-fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Abstract:</h3>
                        {categoryId === 'galaxies' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              isReading ? stopReading() : readText(article.abstract);
                            }}
                            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                              isReading 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {isReading ? (
                              <>
                                <span>Stop Reading</span>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                              </>
                            ) : (
                              <>
                                <span>Read Abstract</span>
                                <span>🔊</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <p className="text-gray-300">{formatText(article.abstract)}</p>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => fetchConclusions(article)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        disabled={loadingConclusions}
                      >
                        {loadingConclusions ? 'Loading...' : 'Conclusions'}
                      </button>
                    </div>

                    {article.conclusions && (
                      <div className="p-4 bg-gray-700/50 rounded-lg animate-fade-in">
                        <h3 className="font-semibold mb-2">Conclusions:</h3>
                        <p className="text-gray-300">{formatText(article.conclusions)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {(!categoryToArxivCode || !categoryToArxivCode[categoryId || '']) && (
          <p className="text-center text-gray-400">
            Latest research papers in this category will be displayed here.
          </p>
        )}
      </div>
    </div>
  );
} 