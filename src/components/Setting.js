import React, { useState } from 'react';

const ThemeToggler = () => {
  const [theme, setTheme] = useState('light'); // Track current theme

  const toggleTheme = () => {
    // Toggle between light and dark mode
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      {/* Apply dark mode styles */}
      <button onClick={toggleTheme} className="mt-4 text-blue-500 hover:underline">
        Change Theme
      </button>
    </div>
  );
};

export default ThemeToggler;
