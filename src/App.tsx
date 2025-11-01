import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from './hooks/redux';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.preferences.theme);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ErrorBoundary>
        {user ? <Dashboard /> : <Login />}
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;