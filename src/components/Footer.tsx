import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Droplet, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Droplet className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold">BloodHeroes</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Connecting donors with those in need, one donation at a time.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Blood Donation
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Donation Events
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blood Types Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Get Involved</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Become a Donor
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Host a Blood Drive
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-400">
                123 Blood Center Ave
              </li>
              <li className="text-gray-400">
                Healthytown, MED 12345
              </li>
              <li className="text-gray-400">
                +1 (555) 123-4567
              </li>
              <li>
                <a href="mailto:info@bloodheroes.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  info@bloodheroes.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BloodHeroes. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-6 items-center text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="mt-2 md:mt-0 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <div className="mt-2 md:mt-0 flex items-center text-primary-500">
              <Heart size={16} className="mr-1" />
              <span>Made with love for life</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;