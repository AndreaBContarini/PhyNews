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
  Hash 
} from 'lucide-react';

const topics = [
  {
    id: 'cs',
    name: 'Computer Science',
    description: 'Latest advances in artificial intelligence, algorithms, and computational theory',
    icon: Code,
    color: 'green'
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: LineChart,
    description: 'Research in economic theory and empirical studies'
  },
  {
    id: 'eess',
    name: 'Electrical Engineering',
    icon: Cpu,
    description: 'Research in circuits, systems, and signal processing'
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Cutting-edge research in quantum mechanics, relativity, particle physics, and cosmology',
    icon: Atom,
    color: 'blue'
  },
  {
    id: 'stats',
    name: 'Statistics',
    icon: BarChart2,
    description: 'Developments in statistical methods and theory'
  },
  { id: 'q-fin', name: 'Quantitative Finance', icon: DollarSign, description: 'Mathematical approaches to financial markets' },
  { id: 'q-bio', name: 'Quantitative Biology', icon: Dna, description: 'Mathematical modeling in biological systems' },
  { id: 'math', name: 'Mathematics', icon: Hash, description: 'Pure and applied mathematical research' }
].sort((a, b) => a.name.localeCompare(b.name));

export default function Dashboard() {
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

  const handleViewArticles = (topic: any) => {
    if (topic.id === 'physics') {
      navigate('/physics');
    } else if (topic.id === 'cs') {
      navigate('/cs');
    } else {
      navigate(`/articles/${topic.id}`);
    }
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
            const isSelected = selectedTopic === topic.id;
            
            return (
              <div key={topic.id} className="flex flex-col">
                <button
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-6 rounded-xl text-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-600 scale-102 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                      : 'bg-gray-800/50 hover:bg-gray-800/80 hover:scale-101'
                  }`}
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                    isSelected ? 'text-white' : 'text-blue-500'
                  }`} />
                  <h2 className="text-xl font-semibold mb-3">{topic.name}</h2>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    isSelected ? 'text-blue-100' : 'text-gray-300'
                  }`}>
                    {topic.description}
                  </p>
                </button>
                
                {isSelected && (
                  <div className="mt-3 text-center animate-fade-in">
                    <button
                      onClick={() => handleViewArticles(topic)}
                      className="w-full px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium transform hover:translate-y-[-2px]"
                    >
                      Choose subject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}