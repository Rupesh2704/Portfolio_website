import React, { useState, useEffect } from 'react';

const roles = [
  "Full Stack Developer",
  "Designer",
  "Problem Solver"
];

const RunningText = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentRole = roles[currentIndex];
      
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentRole.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  return (
    <div className="min-h-[40px] flex items-center justify-center text-center">
      <div className="relative inline-flex">
        <span className="text-primary text-2xl font-bold">
          {currentText}
        </span>
        <span className="text-primary text-2xl font-bold animate-blink absolute right-[-4px]">
          |
        </span>
      </div>
    </div>
  );
};

export default RunningText; 