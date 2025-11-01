import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #4a90e2;
    --secondary-color: #8884d8;
    --error-color: #dc3545;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --text-primary: #333333;
    --text-secondary: #666666;
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --transition-speed: 0.2s;
    --border-radius: 10px;
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 4px;
    
    &:hover {
      background: var(--primary-color);
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .fade-in {
    animation: fadeIn var(--transition-speed) ease-in;
  }

  .slide-up {
    animation: slideUp var(--transition-speed) ease-out;
  }
`;