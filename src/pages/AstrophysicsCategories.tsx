import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Star, Orbit, Earth, Zap, Telescope, Sun } from 'lucide-react';

const astrophysicsCategories = [
  {
    id: 'galaxies',
    name: 'Astrophysics of Galaxies',
    icon: Orbit,
    description: 'Research on galactic structure, formation, and evolution',
    arxivCode: 'astro-ph.GA'
  },
  {
    id: 'cosmology',
    name: 'Cosmology and Nongalactic Astrophysics',
    icon: Star,
    description: 'Studies of the universe at large scales and early times',
    arxivCode: 'astro-ph.CO'
  },
  {
    id: 'earth-planetary',
    name: 'Earth and Planetary Astrophysics',
    icon: Earth,
    description: 'Research on planets, exoplanets, and planetary systems',
    arxivCode: 'astro-ph.EP'
  },
  {
    id: 'high-energy',
    name: 'High Energy Astrophysical Phenomena',
    icon: Zap,
    description: 'Study of energetic processes in the universe',
    arxivCode: 'astro-ph.HE'
  },
  {
    id: 'instrumentation',
    name: 'Instrumentation and Methods for Astrophysics',
    icon: Telescope,
    description: 'Development of tools and techniques for astronomical research',
    arxivCode: 'astro-ph.IM'
  },
  {
    id: 'solar-stellar',
    name: 'Solar and Stellar Astrophysics',
    icon: Sun,
    description: 'Research on stars and stellar phenomena',
    arxivCode: 'astro-ph.SR'
  }
].sort((a, b) => a.name.localeCompare(b.name));

export default function AstrophysicsCategories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  // Filtra le categorie in base alla ricerca
  const filteredCategories = astrophysicsCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Astrophysics Categories</h1>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            Explore articles across different areas of astrophysics
          </p>
          
          {/* Barra di ricerca */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="hover:text-gray-300 transition-colors"
                  >
                    ✕
                  </button>
                ) : (
                  <span className="w-5 h-5">🔍</span>
                )}
              </div>
            </div>
            {filteredCategories.length === 0 && (
              <p className="text-gray-400 mt-4">
                No categories found matching "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
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
                      onClick={() => navigate(`/physics/astrophysics/${category.id}`)}
                      className="w-full px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                               transition-all duration-300 shadow-lg hover:shadow-blue-500/25 
                               font-medium transform hover:translate-y-[-2px]"
                    >
                      View Articles
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
