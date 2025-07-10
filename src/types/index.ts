export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  followers: number;
  following: number;
  bio?: string;
  level: number;
  energy: number;
  constellation: string;
}

export interface Pulse {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  resonance: number;
  amplify: number;
  echoes: number;
  isResonating: boolean;
  isAmplified: boolean;
  media?: string[];
  mood: 'spark' | 'flow' | 'storm' | 'calm' | 'burst';
  dimension: 'personal' | 'creative' | 'tech' | 'nature' | 'cosmic';
}

export interface Constellation {
  name: string;
  pulses: number;
  dimension: string;
  energy: number;
}</parameter>