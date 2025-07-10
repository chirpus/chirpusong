import React from 'react';
import { Home, Compass, Zap, Sparkles, User, Telescope, Atom } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user, profile } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', active: true, color: 'bg-blue-500' },
    { icon: Compass, label: 'Explore', active: false, color: 'bg-green-500' },
    { icon: Zap, label: 'Trending', active: false, color: 'bg-yellow-500' },
    { icon: Telescope, label: 'Communities', active: false, color: 'bg-purple-500' },
    { icon: Sparkles, label: 'Favorites', active: false, color: 'bg-pink-500' },
    { icon: User, label: 'Profile', active: false, color: 'bg-indigo-500' },
    { icon: Atom, label: 'Settings', active: false, color: 'bg-gray-500' }
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                item.active
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`p-2 rounded-lg ${item.color} ${item.active ? 'shadow-sm' : 'opacity-70 group-hover:opacity-100'} transition-all duration-300`}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Profile Card */}
        {user && profile && (
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profile.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={profile.display_name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-blue-200"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{profile.level}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{profile.display_name}</h3>
                  {profile.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">@{profile.username}</p>
                <p className="text-xs text-blue-600 mt-1">{profile.constellation}</p>
              </div>
            </div>
            
            {/* Energy Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Energy</span>
                <span>{profile.energy}/1000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(profile.energy / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm">
              <div className="text-center">
                <p className="font-semibold text-gray-900">{profile.following_count}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{profile.followers_count}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-blue-600">Level {profile.level}</p>
                <p className="text-xs text-gray-500">Nexus Rank</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;