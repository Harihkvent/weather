import React from 'react';
import { useAppSelector } from './hooks/redux';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return user ? <Dashboard /> : <Login />;
};

export default App;