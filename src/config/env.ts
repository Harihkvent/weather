const requiredEnvVars = {
  REACT_APP_OPENWEATHER_API_KEY: process.env.REACT_APP_OPENWEATHER_API_KEY,
  REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};

export const validateEnvVars = () => {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n` +
      `${missingVars.join('\n')}\n\n` +
      `Please check that:\n` +
      `1. You have a .env file in the project root\n` +
      `2. The variables are correctly named (REACT_APP_ prefix is required)\n` +
      `3. The development server was restarted after adding variables`
    );
  }
};

export const config = {
  openWeatherApiKey: process.env.REACT_APP_OPENWEATHER_API_KEY!,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
} as const;