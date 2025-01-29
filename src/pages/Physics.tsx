import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Atom, Beaker, Rocket, Stars, Zap, Microscope, Star, Box, Calculator, Radiation, Waves } from 'lucide-react';

const physicsCategories = [
  {
    id: 'astrophysics',
    name: 'Astrophysics',
    icon: Star,
    description: 'Study of celestial objects, phenomena, and the universe'
  },
  {
    id: 'condensed-matter',
    name: 'Condensed Matter',
    icon: Box,
    description: 'Properties of condensed phases of matter'
  },
  {
    id: 'general-physics',
    name: 'General Physics',
    icon: Atom,
    description: 'Fundamental principles and theories of physics'
  },
  {
    id: 'hep',
    name: 'High Energy Physics',
    icon: Zap,
    description: 'Study of elementary particles and fundamental forces'
  },
  {
    id: 'mathematical-physics',
    name: 'Mathematical Physics',
    icon: Calculator,
    description: 'Mathematical methods in physics'
  },
  {
    id: 'nuclear',
    name: 'Nuclear Physics',
    icon: Radiation,
    description: 'Study of atomic nuclei and nuclear processes'
  },
  {
    id: 'quantum-physics',
    name: 'Quantum Physics',
    icon: Waves,
    description: 'Quantum mechanics and quantum phenomena'
  }
].sort((a, b) => a.name.localeCompare(b.name));

export default function Physics() {
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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Physics Categories</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Select a category to explore the latest research articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {physicsCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <div key={category.id} className="flex flex-col">
                <button
                  onClick={() => handleCategorySelect(category.id)}
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
                      onClick={() => {
                        if (category.id === 'hep') {
                          navigate('/physics/hep');
                        } else if (category.id === 'astrophysics') {
                          navigate('/physics/astrophysics');
                        } else {
                          navigate(`/physics/${category.id}`);
                        }
                      }}
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