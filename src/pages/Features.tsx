import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Brain, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Headphones, 
  UserCircle2,
  ArrowRight
} from 'lucide-react';

export default function Features() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const workflowSteps = [
    {
      icon: UserCircle2,
      title: "Create Your Profile",
      description: "Sign up and tell us about your research interests",
      color: "blue"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI processes thousands of papers daily",
      color: "purple"
    },
    {
      icon: Sparkles,
      title: "Smart Matching",
      description: "Get personalized paper recommendations",
      color: "pink"
    },
    {
      icon: Heart,
      title: "Interact & Improve",
      description: "Like papers to improve future recommendations",
      color: "red"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Research{" "}
            <span className="text-blue-500">Intelligently</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience a smarter way to stay updated with scientific research.
            Our AI-powered platform learns from your interests to deliver
            personalized recommendations.
          </p>
        </div>

        {/* Workflow Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-center mb-16">How PhyNews Works</h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`p-6 bg-gray-800/50 rounded-xl border-2 border-${step.color}-500/30 
                                 hover:border-${step.color}-500/50 hover:bg-gray-800/80 hover:shadow-lg
                                 hover:shadow-${step.color}-500/20 transition-all duration-300
                                 transform hover:scale-105`}>
                    <div className={`w-16 h-16 mx-auto mb-4 bg-${step.color}-500/20 rounded-full 
                                  flex items-center justify-center group-hover:bg-${step.color}-500/30`}>
                      {React.createElement(step.icon, {
                        className: `w-8 h-8 text-${step.color}-500`
                      })}
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-center">{step.description}</p>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-[3.25rem] transform -translate-y-1/2 
                                  text-7xl text-white font-light opacity-75">
                      ⟼
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ML System Explanation */}
        <div className="bg-gray-800/50 rounded-xl p-8 mb-20 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How Our Recommendation System Works
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Brain className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Learning Algorithm</h3>
                <p className="text-gray-400">
                  Our AI-powered recommendation system uses sophisticated algorithms including TF-IDF, 
                  cosine similarity, and Jaccard similarity to find the most relevant papers for you. 
                  Each article receives a dynamic score based on:
                </p>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-400">
                      <strong className="text-blue-400">Smart Category Match (30%)</strong> - Uses Jaccard 
                      similarity to compare article categories with your research interests, weighted by 
                      your visit frequency
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-400">
                      <strong className="text-purple-400">Author Relevance (30%)</strong> - Dynamically 
                      adjusts author importance based on your reading patterns and likes
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-400">
                      <strong className="text-pink-400">Semantic Analysis (20%)</strong> - Uses TF-IDF and 
                      cosine similarity to understand the meaning behind titles and match your interests
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">
                      <strong className="text-green-400">Content Understanding (20%)</strong> - Analyzes 
                      abstracts using advanced NLP techniques to ensure deep content relevance
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-full">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Dynamic Learning & Adaptation</h3>
                <p className="text-gray-400">
                  Our system continuously evolves with your interactions. Feature weights automatically 
                  adjust based on your behavior: if you frequently follow specific authors, their weight 
                  increases; if you prefer certain categories, they gain more importance. Previously liked 
                  papers are intelligently re-ranked rather than excluded, ensuring you don't miss important 
                  updates while maintaining content diversity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-pink-500/20 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparent Recommendations</h3>
                <p className="text-gray-400">
                  Each recommendation comes with detailed match explanations, showing exactly why it was 
                  selected. You can see the contribution of each factor - category matches, author relevance, 
                  keyword similarity, and content analysis - helping you understand and fine-tune your 
                  research preferences over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <button
            onClick={() => navigate(user ? '/dashboard' : '/auth?mode=signup')}
            className="group inline-flex items-center px-8 py-4 text-lg font-medium 
                     text-white bg-blue-600 rounded-xl hover:bg-blue-700 
                     transition-all duration-300 transform hover:scale-105"
          >
            {user ? 'Go to Dashboard' : 'Try It Now'}{' '}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}