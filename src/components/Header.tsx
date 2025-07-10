import React from 'react';
import { Search, Zap, Compass, Sparkles, User, Settings } from 'lucide-react';
import { currentUser } from '../data/mockData';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nexus
              </h1>
              <p className="text-xs text-purple-300 -mt-1">Connect Beyond</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Explore the nexus..."
                className="w-full pl-12 pr-6 py-3 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-white placeholder-purple-300 backdrop-blur-sm transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
              <Zap className="w-5 h-5 text-purple-300 group-hover:text-yellow-400 transition-colors" />
            </button>
            <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
              <Compass className="w-5 h-5 text-purple-300 group-hover:text-cyan-400 transition-colors" />
            </button>
            <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
              <Settings className="w-5 h-5 text-purple-300 group-hover:text-pink-400 transition-colors" />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 ml-4 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400/50"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{currentUser.level}</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{currentUser.displayName}</p>
                <p className="text-xs text-purple-300">{currentUser.energy} Energy</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;</parameter>