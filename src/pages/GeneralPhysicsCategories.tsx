import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Cog, 
  Microscope, 
  Cloud, 
  Atom,
  Beaker,
  HeartPulse, 
  Binary,
  Waves,
  Globe2,
  GraduationCap,
  Zap,
  Users,
  Rocket
} from 'lucide-react';

const physicsCategories = [
  {
    id: 'accelerator',
    name: 'Accelerator Physics',
    icon: Atom,
    description: 'Physics of particle accelerators'
  },
  {
    id: 'applied',
    name: 'Applied Physics',
    icon: Cog,
    description: 'Practical applications of physical principles'
  },
  {
    id: 'atmospheric',
    name: 'Atmospheric and Oceanic Physics',
    icon: Cloud,
    description: 'Physics of the atmosphere and oceans'
  },
  {
    id: 'atomic-clusters',
    name: 'Atomic and Molecular Clusters',
    icon: Atom,
    description: 'Atomic and molecular cluster systems'
  },
  {
    id: 'atomic',
    name: 'Atomic Physics',
    icon: Atom,
    description: 'Study of atomic systems and processes'
  },
  {
    id: 'biological',
    name: 'Biological Physics',
    icon: HeartPulse,
    description: 'Physics applied to biological systems'
  },
  {
    id: 'chemical',
    name: 'Chemical Physics',
    icon: Beaker,
    description: 'Physics of chemical processes'
  },
  {
    id: 'classical',
    name: 'Classical Physics',
    icon: Microscope,
    description: 'Classical mechanics and physics'
  },
  {
    id: 'computational',
    name: 'Computational Physics',
    icon: Binary,
    description: 'Computational methods in physics'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis, Statistics and Probability',
    icon: Binary,
    description: 'Data analysis and statistical methods in physics'
  },
  {
    id: 'fluid-dynamics',
    name: 'Fluid Dynamics',
    icon: Waves,
    description: 'Study of fluid motion and flow'
  },
  {
    id: 'general',
    name: 'General Physics',
    icon: Microscope,
    description: 'General principles of physics'
  },
  {
    id: 'geophysics',
    name: 'Geophysics',
    icon: Globe2,
    description: 'Physics of the Earth'
  },
  {
    id: 'history-philosophy',
    name: 'History and Philosophy of Physics',
    icon: GraduationCap,
    description: 'History and philosophical aspects of physics'
  },
  {
    id: 'instrumentation',
    name: 'Instrumentation and Detectors',
    icon: Cog,
    description: 'Scientific instruments and detection systems'
  },
  {
    id: 'medical',
    name: 'Medical Physics',
    icon: HeartPulse,
    description: 'Physics applied to medicine'
  },
  {
    id: 'optics',
    name: 'Optics',
    icon: Zap,
    description: 'Light phenomena and optical systems'
  },
  {
    id: 'physics-society',
    name: 'Physics and Society',
    icon: Users,
    description: 'Impact of physics on society'
  },
  {
    id: 'physics-education',
    name: 'Physics Education',
    icon: GraduationCap,
    description: 'Physics teaching and learning'
  },
  {
    id: 'plasma',
    name: 'Plasma Physics',
    icon: Zap,
    description: 'Physics of plasma states'
  },
  {
    id: 'popular',
    name: 'Popular Physics',
    icon: Users,
    description: 'Science communication in physics'
  },
  {
    id: 'space',
    name: 'Space Physics',
    icon: Rocket,
    description: 'Physics of space phenomena'
  }
];

export default function GeneralPhysicsCategories() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Physics Categories</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore articles across different areas of physics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicsCategories.map((category) => {
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
                      onClick={() => navigate(`/physics/general/${category.id}`)}
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