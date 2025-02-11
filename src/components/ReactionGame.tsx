import React, { useState, useEffect } from 'react';

const ReactionGame = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setReactionTime(null);
    moveBox();
  };

  const moveBox = () => {
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
      const maxX = gameArea.clientWidth - 50;  // 50 is box width
      const maxY = gameArea.clientHeight - 50; // 50 is box height
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      
      setPosition({ x: newX, y: newY });
      setStartTime(Date.now());
    }
  };

  const handleClick = () => {
    if (startTime) {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
      
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-dark-card rounded-lg shadow-xl border border-primary/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">Reaction Game</h2>
        <div className="text-white text-sm">
          Best: {bestTime ? `${bestTime}ms` : '-'}
        </div>
      </div>

      <div 
        id="gameArea"
        className="relative w-full h-64 bg-dark rounded-lg mb-4 overflow-hidden"
      >
        {isPlaying && (
          <button
            onClick={handleClick}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transition: 'none'
            }}
            className="absolute w-12 h-12 bg-primary rounded-lg hover:bg-primary-dark transform hover:scale-95 transition-transform"
          />
        )}
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            {reactionTime ? (
              <p className="text-white text-center">
                Your reaction time: <span className="text-primary font-bold">{reactionTime}ms</span>
                <br />
                <span className="text-sm text-gray-400">Click Start to try again</span>
              </p>
            ) : (
              <p className="text-white text-center">
                Click the box as quickly as you can!
                <br />
                <span className="text-sm text-gray-400">Click Start to begin</span>
              </p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={startGame}
        className="w-full bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
      >
        {isPlaying ? 'Playing...' : 'Start'}
      </button>
    </div>
  );
};

export default ReactionGame; 