import { useState } from 'react';
import ProtectedPage from './ProtectedPage';
import LandingPage from './LandingPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <LandingPage />;
  }

  return <ProtectedPage onAuthenticated={() => setIsAuthenticated(true)} />;
}
