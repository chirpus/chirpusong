import React from 'react';
import { Search, Zap, Compass, Sparkles, User, Settings } from 'lucide-react';
import { currentUser } from '../data/mockData';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Nexus
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Connect Beyond</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search Nexus..."
                className="w-full pl-12 pr-6 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 group">
              <Zap className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 group">
              <Compass className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 ml-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{currentUser.level}</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{currentUser.displayName}</p>
                <p className="text-xs text-gray-500">{currentUser.energy} Energy</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;