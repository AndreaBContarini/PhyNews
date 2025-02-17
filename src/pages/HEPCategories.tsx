import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Atom, Binary, Calculator, Beaker } from 'lucide-react';

const hepCategories = [
  {
    id: 'experiment',
    name: 'Experiment',
    icon: Beaker,
    description: 'Experimental results in particle physics'
  },
  {
    id: 'lattice',
    name: 'Lattice',
    icon: Binary,
    description: 'Lattice field theory calculations'
  },
  {
    id: 'phenomenology',
    name: 'Phenomenology',
    icon: Atom,
    description: 'Particle phenomenology and theoretical models'
  },
  {
    id: 'theory',
    name: 'Theory',
    icon: Calculator,
    description: 'Theoretical aspects of particle physics'
  }
];

export default function HEPCategories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const formatPublishedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">High Energy Physics</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore articles in different areas of high energy physics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hepCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <div key={category.id} className="flex flex-col">
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl text-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-600 scale-102 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400'
                      : 'bg-gray-800/50 hover:bg-gray-800/80 hover:scale-101'
                  }`}
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
                    isSelected ? 'text-white' : 'text-blue-500'
                  }`} />
                  <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    isSelected ? 'text-blue-100' : 'text-gray-300'
                  }`}>
                    {category.description}
                  </p>
                </button>
                
                {isSelected && (
                  <div className="mt-3 text-center animate-fade-in">
                    <button
                      onClick={() => navigate(`/physics/hep/${category.id}`)}
                      className="w-full px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium transform hover:translate-y-[-2px]"
                    >
                      Choose field
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