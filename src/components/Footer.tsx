import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin } from 'lucide-react';
import LogoPhyNews from '../assets/LogoPhyNews.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={LogoPhyNews} alt="PhyNews Logo" className="w-8 h-8" />
              <span className="font-bold text-xl">PhyNews</span>
            </div>
            <p className="text-gray-400">
              Your daily dose of science breakthroughs, delivered in audio format.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/andreabellicontarini/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} PhyNews. All rights reserved. {' '}
            <span className="text-gray-500">|</span>{' '}
            <a 
              href="https://www.martes-ai.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Powered by Martes AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
