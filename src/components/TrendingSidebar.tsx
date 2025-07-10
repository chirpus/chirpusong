import React from 'react';
import { TrendingUp, Settings, Sparkles, Zap, Users } from 'lucide-react';
import { constellations } from '../data/mockData';

const TrendingSidebar: React.FC = () => {
  const nexusExplorers = [
    {
      name: 'Aurora Vex',
      username: 'aurora_quantum',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      constellation: 'Innovators',
      level: 12,
      energy: 1450
    },
    {
      name: 'Neo Cipher',
      username: 'neo_matrix',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      constellation: 'Builders',
      level: 8,
      energy: 920
    },
    {
      name: 'Stella Nova',
      username: 'stella_cosmic',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      constellation: 'Dreamers',
      level: 15,
      energy: 1800
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <aside className="w-80 p-6 space-y-6">
      {/* Active Constellations */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Trending Topics</h3>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {constellations.map((constellation, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{constellation.dimension}</p>
                  <p className="font-semibold text-gray-900">#{constellation.name}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-blue-600">{formatNumber(constellation.pulses)} posts</span>
                    <span className="text-sm text-green-600">{formatNumber(constellation.energy)} interactions</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nexus Explorers */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Suggested Users</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {nexusExplorers.map((explorer, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={explorer.avatar}
                      alt={explorer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{explorer.level}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{explorer.name}</p>
                    <p className="text-sm text-gray-500">@{explorer.username}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-blue-600">{explorer.constellation}</span>
                      <span className="text-xs text-green-600">{explorer.energy} energy</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 hover:shadow-lg transition-all duration-300">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nexus Info */}
      <div className="text-xs text-gray-500 space-y-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <div className="flex flex-wrap gap-3">
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 transition-colors">API</a>
        </div>
        <p className="text-gray-400">© 2024 Nexus - Connect Beyond Boundaries</p>
      </div>
    </aside>
  );
};

export default TrendingSidebar;