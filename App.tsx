
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Person } from './types';
import { seedDatabase } from './db';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Entradas from './views/Entradas';
import AIStrategy from './views/AIStrategy';
import Login from './views/Login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Person | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await seedDatabase();
      const savedUser = localStorage.getItem('zapata_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      setIsInitialized(true);
    };
    init();
  }, []);

  const handleLogin = (user: Person) => {
    setCurrentUser(user);
    localStorage.setItem('zapata_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('zapata_user');
  };

  if (!isInitialized) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-industrial-black">
        <div className="w-12 h-12 border-4 border-industrial-lime border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen bg-industrial-black text-industrial-text overflow-hidden">
        <Sidebar onLogout={handleLogout} />
        
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/entradas" element={<Entradas />} />
            <Route path="/salidas" element={<div className="p-8"><h2 className="text-2xl font-bold">Módulo de Salidas (Próximamente)</h2></div>} />
            <Route path="/caja" element={<div className="p-8"><h2 className="text-2xl font-bold">Caja Chica (Próximamente)</h2></div>} />
            <Route path="/catalogos" element={<div className="p-8"><h2 className="text-2xl font-bold">Catálogos de Inventario</h2></div>} />
            <Route path="/proveedores" element={<div className="p-8"><h2 className="text-2xl font-bold">Proveedores & Clientes</h2></div>} />
            <Route path="/ai" element={<AIStrategy />} />
            <Route path="/config" element={<div className="p-8"><h2 className="text-2xl font-bold">Configuración del Sistema</h2></div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="fixed bottom-0 right-0 p-2 text-[8px] font-mono text-gray-700 bg-industrial-black/80 backdrop-blur-sm">
          TERMINAL: {Math.random().toString(16).slice(2, 10).toUpperCase()} | NODE_SYNC: OK | V7.2.0-STABLE
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
