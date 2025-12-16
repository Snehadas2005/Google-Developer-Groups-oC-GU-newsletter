import { useState, useEffect } from 'react';

interface TypewriterOptions {
  speed?: number; // characters per second
  startDelay?: number; // ms before starting
}

export function useTypewriter(
  text: string, 
  isActive: boolean,
  options: TypewriterOptions = {}
) {
  const { speed = 40, startDelay = 0 } = options;
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index));
        index++;
        
        if (index > text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 1000 / speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, isActive, speed, startDelay]);

  return { displayText, isComplete };
}