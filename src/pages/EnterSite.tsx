import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const EnterSite = () => {
  const [name, setName] = useState('');
  const { enter } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enter(name)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900">
      <form onSubmit={handleSubmit} className="bg-zinc-800/60 backdrop-blur-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Enter site</h2>
        <p className="text-sm text-zinc-300 mb-6">Enter your name to continue</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded bg-zinc-900 border-2 border-zinc-700 text-white mb-4"
        />
        <button
          type="submit"
          className="w-full bg-primary text-black font-bold py-3 rounded uppercase tracking-wide"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default EnterSite;
