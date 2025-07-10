import React from 'react';
import { Home, Compass, Zap, Sparkles, User, Telescope, Atom } from 'lucide-react';
import { currentUser } from '../data/mockData';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Nexus Hub', active: true, color: 'from-purple-500 to-pink-500' },
    { icon: Compass, label: 'Explore Dimensions', active: false, color: 'from-cyan-500 to-blue-500' },
    { icon: Zap, label: 'Energy Streams', active: false, color: 'from-yellow-500 to-orange-500' },
    { icon: Telescope, label: 'Constellations', active: false, color: 'from-indigo-500 to-purple-500' },
    { icon: Sparkles, label: 'Resonance', active: false, color: 'from-pink-500 to-rose-500' },
    { icon: User, label: 'Profile Matrix', active: false, color: 'from-green-500 to-teal-500' },
    { icon: Atom, label: 'Quantum Lab', active: false, color: 'from-violet-500 to-purple-500' }
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-purple-900/50 to-indigo-900/50 border-r border-white/10 h-screen sticky top-16 overflow-y-auto backdrop-blur-sm">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                item.active
                  ? 'bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg'
                  : 'text-purple-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-xl bg-gradient-to-r ${item.color} ${item.active ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'} transition-all duration-300`}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Profile Card */}
        <div className="mt-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-400/50"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{currentUser.level}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-white">{currentUser.displayName}</h3>
                {currentUser.verified && (
                  <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-purple-300">@{currentUser.username}</p>
              <p className="text-xs text-cyan-400 mt-1">{currentUser.constellation}</p>
            </div>
          </div>
          
          {/* Energy Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-purple-300 mb-2">
              <span>Energy</span>
              <span>{currentUser.energy}/1000</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentUser.energy / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between text-sm">
            <div className="text-center">
              <p className="font-semibold text-white">{currentUser.following}</p>
              <p className="text-xs text-purple-300">Following</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-white">{currentUser.followers}</p>
              <p className="text-xs text-purple-300">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-cyan-400">Level {currentUser.level}</p>
              <p className="text-xs text-purple-300">Nexus Rank</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;</parameter>