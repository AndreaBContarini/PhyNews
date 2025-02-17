import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Brain, Volume2, BarChart, Sparkles, Atom, Zap } from 'lucide-react';
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
import Features from './pages/Features';
import CookieBanner from './components/CookieBanner';
import LogoPhyNews from './assets/LogoPhyNews.png';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              opacity: 0.1
            }}
          >
            {i % 2 === 0 ? (
              <Atom className="w-8 h-8 text-blue-500" />
            ) : (
              <Zap className="w-6 h-6 text-purple-500" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center space-y-12 py-20">
        {/* Logo Animation */}
        <div className="relative inline-block perspective-1000 mb-8">
          <div className="relative transform-gpu animate-float">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <img
              src={LogoPhyNews}
              alt="PhyNews Logo"
              className="relative w-24 h-24 mx-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="inline-block animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Scientific News
            </span>{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-fade-in-up animation-delay-300">
              Simplified
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300 animate-fade-in-up animation-delay-500 leading-relaxed">
            Your personalized research digest in audio format. AI-powered summaries across Physics,
            Economics, Computer Science, Engineering, and more.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-700">
          <Link
            to="/auth?mode=signup"
            className="group px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <Sparkles className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
            </span>
          </Link>
          <Link
            to="/auth?mode=login"
            className="px-8 py-3 text-lg font-medium text-blue-400 border border-blue-400/50 rounded-lg hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/10"
          >
            Login
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-900">
          {[
            { icon: Brain, title: "AI-Powered", desc: "Smart content curation" },
            { icon: Volume2, title: "Audio Format", desc: "Listen on the go" },
            { icon: BarChart, title: "Daily Updates", desc: "Stay ahead of research" }
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/40 transition-all duration-300 transform hover:scale-105"
            >
              <feature.icon className="w-8 h-8 mb-4 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
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
          <Route path="/features" element={<Features />} />
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