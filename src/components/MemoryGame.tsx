import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = ['⚡', '🎮', '🚀', '💻', '🎯', '🎨', '🎵', '🌟'];

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initializeGame = () => {
    // Create pairs of cards and shuffle them
    const cardPairs = [...ICONS, ...ICONS].map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));

    // Fisher-Yates shuffle algorithm
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    // Prevent clicking if two cards are already flipped
    if (flippedCards.length === 2) return;
    
    // Prevent clicking on already matched or flipped cards
    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard?.isMatched || clickedCard?.isFlipped) return;

    // Flip the card
    setCards(cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));

    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    // Check for matches when two cards are flipped
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard?.icon === secondCard?.icon) {
        // Match found
        setCards(cards.map(card => 
          card.id === first || card.id === second
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    // Check if game is complete
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsComplete(true);
    }
  }, [cards]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-dark-card rounded-lg shadow-xl border border-primary/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Memory Game</h2>
        <div className="text-white">Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square text-3xl rounded-lg transition-all duration-300 transform 
              ${card.isFlipped || card.isMatched 
                ? 'bg-primary text-white rotate-0' 
                : 'bg-dark text-transparent rotate-180'}`}
          >
            {(card.isFlipped || card.isMatched) ? card.icon : '?'}
          </button>
        ))}
      </div>

      {isComplete && (
        <div className="text-center mb-4">
          <p className="text-green-400 text-xl mb-2">
            🎉 Congratulations! You won in {moves} moves!
          </p>
        </div>
      )}

      <button
        onClick={initializeGame}
        className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
      >
        New Game
      </button>
    </div>
  );
};

export default MemoryGame; 