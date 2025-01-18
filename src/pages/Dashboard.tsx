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
  { id: 'physics', name: 'Physics', icon: Atom },
  { id: 'economics', name: 'Economics', icon: LineChart },
  { id: 'cs', name: 'Computer Science', icon: Code },
  { id: 'eess', name: 'Electrical Engineering', icon: Cpu },
  { id: 'stats', name: 'Statistics', icon: BarChart2 },
  { id: 'q-fin', name: 'Quantitative Finance', icon: DollarSign },
  { id: 'q-bio', name: 'Quantitative Biology', icon: Dna },
  { id: 'math', name: 'Mathematics', icon: Hash }
];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Topic</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-6 rounded-xl text-center transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-blue-600 scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-800 hover:scale-105'
                }`}
              >
                <Icon className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-xl font-semibold">{topic.name}</h2>
              </button>
            );
          })}
        </div>
        
        {selectedTopic && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Selected: <span className="text-white font-semibold">{
                topics.find(t => t.id === selectedTopic)?.name
              }</span>
            </p>
            <button
              className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              View Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}