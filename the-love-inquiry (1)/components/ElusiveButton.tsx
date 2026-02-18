
import React, { useState, useCallback, useRef } from 'react';

interface ElusiveButtonProps {
  onAttempt: () => void;
}

const ElusiveButton: React.FC<ElusiveButtonProps> = ({ onAttempt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = useCallback(() => {
    // Generate a random position within a safe radius of the screen
    // We want to avoid pushing it off-screen too far
    const padding = 100;
    const maxX = window.innerWidth / 2 - padding;
    const maxY = window.innerHeight / 2 - padding;

    const randomX = (Math.random() - 0.5) * maxX * 1.5;
    const randomY = (Math.random() - 0.5) * maxY * 1.5;

    setPosition({ x: randomX, y: randomY });
    onAttempt();
  }, [onAttempt]);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={moveButton}
      onMouseDown={moveButton}
      onClick={(e) => {
        // Just in case they are super fast, move it again and prevent default
        e.preventDefault();
        moveButton();
      }}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="px-8 py-3 font-semibold text-slate-500 bg-white border-2 border-slate-200 rounded-full transition-all duration-200 ease-out shadow-sm hover:shadow-md cursor-default select-none active:scale-90"
    >
      No
    </button>
  );
};

export default ElusiveButton;
