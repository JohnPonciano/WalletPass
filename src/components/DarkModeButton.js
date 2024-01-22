// DarkModeButton.js

import { useState, useEffect } from 'react';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    updateDarkMode();
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateDarkMode = () => {
    const body = document.body;

    if (darkMode) {
      body.style.backgroundColor = '#333';
    } else {
      body.style.backgroundColor = '#fff';
    }
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeButton;
