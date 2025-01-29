import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Brain, 
  Languages, 
  Calculator, 
  LineChart, 
  Box, 
  GamepadIcon,
  Eye,
  Users,
  Lock,
  Database,
  Library,
  Network,
  Cpu,
  Lightbulb,
  Code,
  MonitorIcon,
  MousePointer,
  Search,
  Binary,
  Bot,
  Share2,
  Server,
  Laptop,
  Settings,
  Headphones
} from 'lucide-react';

// Ordino le categorie in ordine alfabetico
const csCategories = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: Brain,
    description: 'Machine intelligence, reasoning, and cognition'
  },
  {
    id: 'cl',
    name: 'Computation and Language',
    icon: Languages,
    description: 'Natural language processing and computational linguistics'
  },
  {
    id: 'cc',
    name: 'Computational Complexity',
    icon: Calculator,
    description: 'Complexity theory and algorithm analysis'
  },
  {
    id: 'ce',
    name: 'Computational Engineering, Finance, and Science',
    icon: LineChart,
    description: 'Applications in engineering, finance, and scientific computing'
  },
  {
    id: 'cg',
    name: 'Computational Geometry',
    icon: Box,
    description: 'Geometric algorithms and computational geometry'
  },
  {
    id: 'cv',
    name: 'Computer Vision and Pattern Recognition',
    icon: Eye,
    description: 'Image processing and visual pattern recognition'
  },
  {
    id: 'gt',
    name: 'Computer Science and Game Theory',
    icon: GamepadIcon,
    description: 'Game theory applications in computer science'
  },
  {
    id: 'cy',
    name: 'Computers and Society',
    icon: Users,
    description: 'Social aspects of computing'
  },
  {
    id: 'cr',
    name: 'Cryptography and Security',
    icon: Lock,
    description: 'Security protocols and cryptographic algorithms'
  },
  {
    id: 'ds',
    name: 'Data Structures and Algorithms',
    icon: Database,
    description: 'Algorithm design and data organization'
  },
  {
    id: 'db',
    name: 'Databases',
    icon: Database,
    description: 'Database management and systems'
  },
  {
    id: 'dl',
    name: 'Digital Libraries',
    icon: Library,
    description: 'Digital content management and access'
  },
  {
    id: 'dm',
    name: 'Discrete Mathematics',
    icon: Calculator,
    description: 'Mathematical foundations of computer science'
  },
  {
    id: 'dc',
    name: 'Distributed, Parallel, and Cluster Computing',
    icon: Network,
    description: 'Parallel and distributed systems'
  },
  {
    id: 'et',
    name: 'Emerging Technologies',
    icon: Lightbulb,
    description: 'New and emerging computing technologies'
  },
  {
    id: 'fl',
    name: 'Formal Languages and Automata Theory',
    icon: Code,
    description: 'Theory of computation and formal languages'
  },
  {
    id: 'gl',
    name: 'General Literature',
    icon: Library,
    description: 'General computer science literature'
  },
  {
    id: 'gr',
    name: 'Graphics',
    icon: MonitorIcon,
    description: 'Computer graphics and visualization'
  },
  {
    id: 'ar',
    name: 'Hardware Architecture',
    icon: Cpu,
    description: 'Computer architecture and organization'
  },
  {
    id: 'hc',
    name: 'Human-Computer Interaction',
    icon: MousePointer,
    description: 'User interfaces and interaction design'
  },
  {
    id: 'ir',
    name: 'Information Retrieval',
    icon: Search,
    description: 'Search engines and information retrieval'
  },
  {
    id: 'it',
    name: 'Information Theory',
    icon: Binary,
    description: 'Theory of information and coding'
  },
  {
    id: 'lo',
    name: 'Logic in Computer Science',
    icon: Calculator,
    description: 'Logic and formal methods'
  },
  {
    id: 'lg',
    name: 'Machine Learning',
    icon: Brain,
    description: 'Learning algorithms and systems'
  },
  {
    id: 'ms',
    name: 'Mathematical Software',
    icon: Calculator,
    description: 'Software for mathematical computations'
  },
  {
    id: 'mm',
    name: 'Multimedia',
    icon: MonitorIcon,
    description: 'Multimedia systems and applications'
  },
  {
    id: 'ma',
    name: 'Multiagent Systems',
    icon: Bot,
    description: 'Distributed artificial intelligence'
  },
  {
    id: 'ne',
    name: 'Neural and Evolutionary Computing',
    icon: Brain,
    description: 'Neural networks and evolutionary algorithms'
  },
  {
    id: 'ni',
    name: 'Networking and Internet Architecture',
    icon: Network,
    description: 'Network protocols and architecture'
  },
  {
    id: 'na',
    name: 'Numerical Analysis',
    icon: Calculator,
    description: 'Numerical methods and analysis'
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: Settings,
    description: 'System software and management'
  },
  {
    id: 'oh',
    name: 'Other Computer Science',
    icon: Laptop,
    description: 'Other topics in computer science'
  },
  {
    id: 'pf',
    name: 'Performance',
    icon: LineChart,
    description: 'System performance evaluation'
  },
  {
    id: 'pl',
    name: 'Programming Languages',
    icon: Code,
    description: 'Language design and implementation'
  },
  {
    id: 'ro',
    name: 'Robotics',
    icon: Bot,
    description: 'Robotic systems and control'
  },
  {
    id: 'si',
    name: 'Social and Information Networks',
    icon: Share2,
    description: 'Social networks and information flow'
  },
  {
    id: 'se',
    name: 'Software Engineering',
    icon: Code,
    description: 'Software development and engineering'
  },
  {
    id: 'sd',
    name: 'Sound',
    icon: Headphones,
    description: 'Audio processing and acoustics'
  },
  {
    id: 'sc',
    name: 'Symbolic Computation',
    icon: Calculator,
    description: 'Computer algebra and symbolic mathematics'
  },
  {
    id: 'sy',
    name: 'Systems and Control',
    icon: Settings,
    description: 'Control systems and automation'
  }
].sort((a, b) => a.name.localeCompare(b.name));

export default function CSCategories() {
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
  const filteredCategories = csCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Computer Science Categories</h1>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            Explore articles across different areas of computer science
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
                  <Search className="w-5 h-5" />
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
                      onClick={() => navigate(`/cs/${category.id}`)}
                      className="w-full px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                               transition-all duration-300 shadow-lg hover:shadow-blue-500/25 
                               font-medium transform hover:translate-y-[-2px]"
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