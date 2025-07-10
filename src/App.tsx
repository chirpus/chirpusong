import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import TrendingSidebar from './components/TrendingSidebar';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <div>
          <Header />
          <div className="flex">
            <Sidebar />
            <Feed />
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;