import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Menu as MenuIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import FeedbackModal from './FeedbackModal';
import LogoPhyNews from '../assets/LogoPhyNews.png';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
}

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const menuItems: MenuItem[] = user ? [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Preferences', href: '/preferences' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-blue-500 transition-colors"
              >
                <img 
                  src={LogoPhyNews} 
                  alt="PhyNews Logo" 
                  className="w-8 h-8" 
                />
                <span>PhyNews</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Feedback
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                  aria-label="Menu"
                >
                  {isDropdownOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <MenuIcon className="h-6 w-6" />
                  )}
                </button>

                {/* Dropdown menu with animation */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                    <div className="py-2 px-1" role="menu">
                      {menuItems.map((item, index) => (
                        item.onClick ? (
                          <button
                            key={index}
                            onClick={() => {
                              setIsDropdownOpen(false);
                              item.onClick?.();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-150"
                            role="menuitem"
                          >
                            {item.label === 'Feedback' && (
                              <span className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                {item.label}
                              </span>
                            )}
                            {item.label !== 'Feedback' && item.label}
                          </button>
                        ) : item.href ? (
                          <Link
                            key={index}
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`block px-4 py-2 text-sm rounded-md transition-colors duration-150 ${
                              item.primary
                                ? "bg-blue-600 text-white hover:bg-blue-700 mx-2"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        ) : null
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button - now matches desktop style */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
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
                    item.onClick?.();
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
              ) : item.href ? (
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
              ) : null
            ))}
          </div>
        </div>
      </nav>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
}