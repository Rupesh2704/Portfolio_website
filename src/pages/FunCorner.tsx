import React from 'react';
import MemoryGame from '../components/MemoryGame';
import ReactionGame from '../components/ReactionGame';
import MazeGame from '../components/MazeGame';

const FunCorner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-dark-lighter py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Fun Corner</h1>
        <p className="text-gray-300 text-center mb-12">
          Take a break and enjoy some fun games! Test your memory, reactions, and problem-solving skills.
        </p>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <section>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Memory Game</h2>
            <MemoryGame />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Reaction Game</h2>
            <ReactionGame />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Maze Runner</h2>
            <MazeGame />
          </section>
        </div>
      </div>
    </div>
  );
};

export default FunCorner; 