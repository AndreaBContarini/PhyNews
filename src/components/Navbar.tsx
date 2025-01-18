import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Atom, MessageSquare, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FeedbackModal from './FeedbackModal';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = user ? [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { 
      label: 'Feedback',
      onClick: () => setIsFeedbackOpen(true)
    },
    { 
      label: 'Logout',
      onClick: handleLogout
    }
  ] : [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Login', href: '/auth?mode=login' },
    { label: 'Start Free Trial', href: '/auth?mode=signup', primary: true }
  ];

  return (
    <>
      <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Atom className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl">PhyNews</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item, index) => (
                item.onClick ? (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                  >
                    {item.label === 'Feedback' && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {item.label}
                      </span>
                    )}
                    {item.label !== 'Feedback' && item.label}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className={item.primary 
                      ? "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      : "text-gray-300 hover:text-white px-3 py-2 rounded-md"
                    }
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 shadow-lg">
            {menuItems.map((item, index) => (
              item.onClick ? (
                <button
                  key={index}
                  onClick={() => {
                    setIsMenuOpen(false);
                    item.onClick();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                >
                  {item.label === 'Feedback' && (
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {item.label}
                    </span>
                  )}
                  {item.label !== 'Feedback' && item.label}
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    item.primary
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </nav>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
}