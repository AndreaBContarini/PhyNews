import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Atom, 
  LineChart, 
  Code, 
  Cpu, 
  BarChart2, 
  DollarSign, 
  Dna, 
  Hash // Replacing Function icon with Hash for mathematics
} from 'lucide-react';

const topics = [
  { id: 'physics', name: 'Physics', icon: Atom, description: 'Latest discoveries in quantum mechanics, relativity, and more' },
  { id: 'economics', name: 'Economics', icon: LineChart, description: 'Research in economic theory and empirical studies' },
  { id: 'cs', name: 'Computer Science', icon: Code, description: 'Advances in algorithms, AI, and software engineering' },
  { id: 'eess', name: 'Electrical Engineering', icon: Cpu, description: 'Research in circuits, systems, and signal processing' },
  { id: 'stats', name: 'Statistics', icon: BarChart2, description: 'Developments in statistical methods and theory' },
  { id: 'q-fin', name: 'Quantitative Finance', icon: DollarSign, description: 'Mathematical approaches to financial markets' },
  { id: 'q-bio', name: 'Quantitative Biology', icon: Dna, description: 'Mathematical modeling in biological systems' },
  { id: 'math', name: 'Mathematics', icon: Hash, description: 'Pure and applied mathematical research' }
];

export default function Topics() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleTopicSelect = async (topicId: string) => {
    setSelectedTopic(topicId);
    // Here you would typically save the user's preference to Supabase
    // and then navigate to the articles page for that topic
    navigate(`/articles/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Research Field</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select your preferred field of study. You'll receive daily summaries and audio versions
            of the latest research papers in your chosen area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className={`p-6 rounded-xl text-left transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-blue-600 scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-800 hover:scale-105'
                }`}
              >
                <Icon className="w-8 h-8 mb-4" />
                <h2 className="text-xl font-semibold mb-2">{topic.name}</h2>
                <p className="text-sm text-gray-400">{topic.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}