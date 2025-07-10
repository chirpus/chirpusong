import { User, Pulse, Constellation } from '../types';

export const currentUser: User = {
  id: '1',
  username: 'cosmic_dreamer',
  displayName: 'Luna Starweaver',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  verified: true,
  followers: 1247,
  following: 892,
  bio: 'Digital Alchemist ✨ Weaving dreams into reality through code and creativity',
  level: 7,
  energy: 850,
  constellation: 'Innovators'
};

export const mockUsers: User[] = [
  {
    id: '2',
    username: 'neon_architect',
    displayName: 'Zara Flux',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    followers: 2341,
    following: 567,
    bio: 'Building tomorrow\'s experiences today | AR/VR Pioneer',
    level: 9,
    energy: 1200,
    constellation: 'Builders'
  },
  {
    id: '3',
    username: 'pixel_sage',
    displayName: 'Kai Prism',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: false,
    followers: 892,
    following: 1234,
    bio: 'Visual Storyteller | Capturing light in digital realms',
    level: 5,
    energy: 620,
    constellation: 'Creators'
  },
  {
    id: '4',
    username: 'quantum_flow',
    displayName: 'River Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
    followers: 3456,
    following: 789,
    bio: 'Code Whisperer | Turning algorithms into art',
    level: 8,
    energy: 950,
    constellation: 'Innovators'
  }
];

export const mockPulses: Pulse[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: 'Just launched a mind-bending AR experience that lets you paint with light in 3D space! The intersection of technology and human creativity never ceases to amaze me. ✨🎨',
    timestamp: new Date(Date.now() - 3600000),
    resonance: 234,
    amplify: 45,
    echoes: 28,
    isResonating: false,
    isAmplified: false,
    mood: 'burst',
    dimension: 'tech',
    media: ['https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800']
  },
  {
    id: '2',
    user: mockUsers[1],
    content: 'Witnessed the most ethereal sunrise today. Sometimes nature\'s algorithms are the most beautiful code of all. Every photon tells a story of cosmic dance and infinite possibility.',
    timestamp: new Date(Date.now() - 7200000),
    resonance: 567,
    amplify: 89,
    echoes: 42,
    isResonating: true,
    isAmplified: false,
    mood: 'calm',
    dimension: 'nature',
    media: ['https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800']
  },
  {
    id: '3',
    user: mockUsers[2],
    content: 'Building a neural interface that translates emotions into visual symphonies. What if we could see feelings as colors and hear thoughts as melodies? The future is synesthetic! 🌈🎵',
    timestamp: new Date(Date.now() - 10800000),
    resonance: 345,
    amplify: 67,
    echoes: 56,
    isResonating: false,
    isAmplified: true,
    mood: 'flow',
    dimension: 'tech',
    media: []
  },
  {
    id: '4',
    user: currentUser,
    content: 'Found this hidden gem of a café where they serve coffee in cups that change color with temperature. Design that responds to interaction - that\'s the magic we need more of! ☕✨',
    timestamp: new Date(Date.now() - 14400000),
    resonance: 128,
    amplify: 23,
    echoes: 15,
    isResonating: false,
    isAmplified: false,
    mood: 'spark',
    dimension: 'creative',
    media: []
  }
];

export const constellations: Constellation[] = [
  { name: 'Innovators', pulses: 45200, dimension: 'Technology', energy: 89300 },
  { name: 'Creators', pulses: 23100, dimension: 'Art & Design', energy: 67800 },
  { name: 'Builders', pulses: 34500, dimension: 'Engineering', energy: 78900 },
  { name: 'Dreamers', pulses: 15600, dimension: 'Philosophy', energy: 45600 },
  { name: 'Explorers', pulses: 28900, dimension: 'Discovery', energy: 56700 }
];