import React, { useState, useEffect } from 'react';
import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import icon from './assets/Logo.ico'; // Import the icon file
import Login from './Login'; // Import the Login component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = 'Paciolinova'; // Change the title of the window
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link'); // Find existing icon link element or create a new one
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon; // Set the icon file path
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ChatContextProvider>
      <div className="flex transition duration-500 ease-in-out">
        <SideBar />
        <ChatView />
      </div>
    </ChatContextProvider>
  );
};

export default App;
