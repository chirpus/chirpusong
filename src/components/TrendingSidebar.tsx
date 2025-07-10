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
      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
        <div className="p-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Active Constellations</h3>
            </div>
            <button className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200">
              <Settings className="w-4 h-4 text-purple-300" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {constellations.map((constellation, index) => (
            <div key={index} className="p-4 hover:bg-white/5 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">{constellation.dimension}</p>
                  <p className="font-semibold text-white">#{constellation.name}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-cyan-400">{formatNumber(constellation.pulses)} pulses</span>
                    <span className="text-sm text-yellow-400">{formatNumber(constellation.energy)} energy</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nexus Explorers */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
        <div className="p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-bold text-white">Nexus Explorers</h3>
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {nexusExplorers.map((explorer, index) => (
            <div key={index} className="p-4 hover:bg-white/5 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={explorer.avatar}
                      alt={explorer.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-400/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{explorer.level}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{explorer.name}</p>
                    <p className="text-sm text-purple-300">@{explorer.username}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-cyan-400">{explorer.constellation}</span>
                      <span className="text-xs text-yellow-400">{explorer.energy} energy</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nexus Info */}
      <div className="text-xs text-purple-400 space-y-3 bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-4 border border-white/5">
        <div className="flex flex-wrap gap-3">
          <a href="#" className="hover:text-cyan-400 transition-colors">About Nexus</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Quantum Help</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Matrix</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Developers</a>
        </div>
        <p className="text-purple-500">© 2024 Nexus Labs - Connecting Beyond Reality</p>
      </div>
    </aside>
  );
};

export default TrendingSidebar;</parameter>