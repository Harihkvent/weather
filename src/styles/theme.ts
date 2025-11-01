export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    success: string;
    warning: string;
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      primary: string;
      secondary: string;
      card: string;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    large: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  animations: {
    easeOut: string;
    duration: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#4a90e2',
    secondary: '#8884d8',
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      card: '#ffffff',
    },
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  animations: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: '0.2s',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#61dafb',
    secondary: '#a997ff',
    error: '#ff6b6b',
    success: '#51cf66',
    warning: '#ffd43b',
    text: {
      primary: '#e9ecef',
      secondary: '#adb5bd',
    },
    background: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      card: '#333333',
    },
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
};