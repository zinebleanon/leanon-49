
import { useEffect } from 'react';

// This hook addresses the iOS Safari viewport height issue
// where 100vh includes the address bar
export function useViewportHeight() {
  useEffect(() => {
    // Function to update CSS variable with correct viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set the initial value
    setVh();

    // Update on resize and orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);
}

export default useViewportHeight;
