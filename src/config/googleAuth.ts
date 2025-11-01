if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
  throw new Error('Google Client ID not found in environment variables');
}

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// Scopes required for the application
export const GOOGLE_SCOPES = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];