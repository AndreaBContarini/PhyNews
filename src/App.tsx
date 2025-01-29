import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Atom, Brain, Volume2, BarChart } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import Physics from './pages/Physics';
import PhysicsCategory from './pages/PhysicsCategory';
import CSCategories from './pages/CSCategories';
import AstrophysicsCategories from './pages/AstrophysicsCategories';
import CookieBanner from './components/CookieBanner';

function HeroSection() {
  return (
    <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
      <div className="space-y-8">
        <div className="relative inline-block animate-fade-in-down perspective-1000">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
          <Atom className="w-20 h-20 mx-auto text-blue-500 relative animate-spin-3d transform-gpu" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="inline-block animate-fade-in-up">
              Scientific News
            </span>{' '}
            <span className="inline-block text-blue-500 animate-fade-in-up animation-delay-300">
              Simplified
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300 animate-fade-in-up animation-delay-500">
            Your personalized research digest in audio format. AI-powered summaries across Physics,
            Economics, Computer Science, Engineering, and more.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-700">
          <Link
            to="/auth?mode=signup"
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Free Trial
          </Link>
          <Link
            to="/auth?mode=login"
            className="px-8 py-3 text-lg font-medium text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400/10 transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Old Way vs New Way</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-700/30">
          <h3 className="text-xl font-semibold mb-4">Traditional Research</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✕</span>
              <span>Hours spent reading full papers</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✕</span>
              <span>Information overload and burnout</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✕</span>
              <span>Limited to reading during work hours</span>
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-blue-600/10 border border-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
          <h3 className="text-xl font-semibold mb-4">PhyNews Way</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Concise, AI-powered summaries</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Listen while commuting or exercising</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Stay updated across multiple fields</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <BarChart className="w-8 h-8 text-blue-500" />,
      title: 'Smart Content Selection',
      description:
        'Our ML classifier analyzes thousands of papers daily to match your research interests',
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: 'AI-Powered Summaries',
      description:
        'Complex research papers transformed into clear, concise summaries',
    },
    {
      icon: <Volume2 className="w-8 h-8 text-blue-500" />,
      title: 'Audio Format',
      description: 'Listen to scientific breakthroughs during your commute',
    },
  ];

  return (
    <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ComparisonSection />
      <FeaturesSection />
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/physics/astrophysics" element={<AstrophysicsCategories />} />
          <Route path="/physics/astrophysics/:categoryId" element={<PhysicsCategory />} />
          <Route path="/physics/:categoryId" element={<PhysicsCategory />} />
          <Route path="/cs" element={<CSCategories />} />
          <Route path="/cs/:categoryId" element={<PhysicsCategory />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;