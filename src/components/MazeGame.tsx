import React, { useState, useEffect } from 'react';

// 0 = path, 1 = wall, 2 = player, 3 = exit
const initialMaze = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [2, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 0, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const generateMaze = (width: number, height: number) => {
  // Initialize maze with walls
  const maze = Array(height).fill(null).map(() => 
    Array(width).fill(1)
  );

  const recursiveBacktrack = (x: number, y: number) => {
    const directions = [
      [0, -2], // up
      [2, 0],  // right
      [0, 2],  // down
      [-2, 0]  // left
    ];
    
    // Shuffle directions randomly
    directions.sort(() => Math.random() - 0.5);

    for (let [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      
      if (
        newX > 0 && newX < width - 1 && 
        newY > 0 && newY < height - 1 && 
        maze[newY][newX] === 1
      ) {
        // Create path
        maze[y + dy/2][x + dx/2] = 0;
        maze[newY][newX] = 0;
        recursiveBacktrack(newX, newY);
      }
    }
  };

  // Start from position (1,1)
  maze[1][1] = 0;
  recursiveBacktrack(1, 1);

  // Add player at start
  maze[1][1] = 2;

  // Add exit at a random position on the opposite side
  const possibleExits = [];
  for (let i = 1; i < height - 1; i++) {
    if (maze[i][width - 2] === 0) {
      possibleExits.push([width - 2, i]);
    }
  }
  if (possibleExits.length > 0) {
    const [exitX, exitY] = possibleExits[Math.floor(Math.random() * possibleExits.length)];
    maze[exitY][exitX] = 3;
  } else {
    // Fallback exit position if no valid positions found
    maze[height - 2][width - 2] = 3;
  }

  return maze;
};

const MazeGame = () => {
  const [maze, setMaze] = useState(() => generateMaze(11, 11));
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  const resetGame = () => {
    const newMaze = generateMaze(11, 11);
    setMaze(newMaze);
    setPlayerPos({ x: 1, y: 1 });
    setMoves(0);
    setIsComplete(false);
  };

  const movePlayer = (dx: number, dy: number) => {
    if (isComplete) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (
      newX >= 0 && 
      newX < maze[0].length && 
      newY >= 0 && 
      newY < maze.length && 
      maze[newY][newX] !== 1
    ) {
      if (maze[newY][newX] === 3) {
        setIsComplete(true);
        if (!bestMoves || moves + 1 < bestMoves) {
          setBestMoves(moves + 1);
        }
      }

      const newMaze = maze.map(row => [...row]);
      newMaze[playerPos.y][playerPos.x] = 0;
      newMaze[newY][newX] = 2;
      
      setMaze(newMaze);
      setPlayerPos({ x: newX, y: newY });
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, maze, isComplete]);

  return (
    <div className="max-w-md mx-auto p-4 bg-dark-card rounded-lg shadow-xl border border-primary/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">Maze Runner</h2>
        <div className="text-white text-sm">
          Moves: {moves} | Best: {bestMoves || '-'}
        </div>
      </div>

      <div className="mb-4 select-none">
        {maze.map((row, y) => (
          <div key={y} className="flex justify-center">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-7 h-7 flex items-center justify-center border border-primary/10
                  ${cell === 1 ? 'bg-dark' : 'bg-dark-lighter'}
                  ${cell === 2 ? 'text-primary' : ''}
                  ${cell === 3 ? 'text-green-500' : ''}`}
              >
                {cell === 2 && '😊'}
                {cell === 3 && '🏁'}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div />
        <button
          onClick={() => movePlayer(0, -1)}
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          ↑
        </button>
        <div />
        <button
          onClick={() => movePlayer(-1, 0)}
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          ←
        </button>
        <button
          onClick={() => movePlayer(0, 1)}
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          ↓
        </button>
        <button
          onClick={() => movePlayer(1, 0)}
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          →
        </button>
      </div>

      {isComplete && (
        <div className="text-center mb-4">
          <p className="text-green-400 text-lg">
            🎉 Maze completed in {moves} moves!
          </p>
        </div>
      )}

      <button
        onClick={resetGame}
        className="w-full bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
      >
        New Maze
      </button>
    </div>
  );
};

export default MazeGame; 