import React, { useState } from 'react';
import logo from './assets/paciolinova.png'; // Import your logo image

import layoutBackground1 from './assets/back1.png'; // Import layout background images
import layoutBackground2 from './assets/back2.png';
import layoutBackground3 from './assets/back.jpg';
import Slideshow from './Slideshow'; // Import the Slideshow component

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { // Simulate a network request
      if (username === 'admin' && password === 'admin') {
        onLogin();
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
      setLoading(false);
    }, 1000);
  };

  const images = [layoutBackground1, layoutBackground2, layoutBackground3];

  return (
    <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(21, 21, 21)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Login Layout */}
      <div className="relative max-w-6xl w-full bg-white rounded-lg overflow-hidden flex flex-col md:flex-row z-10 shadow-2xl" style={{ border: '8px solid white', boxShadow: '0 0 0 4px black' }}>

        {/* Left Section - Slideshow with 3D Double Border */}
        <div className="md:w-1/2 relative overflow-hidden" style={{ height: '500px' }}>
          <div className="relative h-full">
            <Slideshow images={images} />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center p-8">
              <img src={logo} alt="Logo de votre entreprise" className="w-40 h-40 mb-4" />
              <h2 className="white text-3xl font-bold text-center text-white mb-4">Bienvenue sur Paciolinova</h2>
              <p className="white text-lg text-center text-white font-bold text-base">Simplifiez vos tâches comptables avec notre chatbot intelligent</p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form with 3D Double Border */}
        <div className=" md:w-1/2 bg-white p-8 flex items-center justify-center">
          <div className=" w-full p-6">
            <h2 className=" text-3xl font-bold text-center mb-8">Connexion</h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div>
                <label className="block mb-2 text-xl font-bold text-gray-700">Nom d&apos;utilisateur</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-xl font-bold text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="submit"
                  className={`px-6 py-4 font-bold text-white bg-blue-400 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                  aria-busy={loading ? 'true' : 'false'}
                >
                  {loading ? 'Connexion en cours...' : 'Connexion'}
                </button>
                <p className="text-gray-700">Vous n&apos;avez pas un compte ? <a href="taouiabdelkarim@paciolinova.com" className="text-blue-500 hover:underline">Contactez-nous !</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
