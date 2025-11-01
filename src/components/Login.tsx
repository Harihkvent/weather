import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setUser, setError, setLoading } from '../features/authSlice';
import * as jwtDecode from 'jwt-decode';
import { RootState } from '../features/store';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
  text-align: center;
`;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      dispatch(setLoading(true));
      console.log('Google OAuth Response:', credentialResponse);
      const decoded = jwtDecode.jwtDecode(credentialResponse.credential) as {
        email: string;
        name: string;
        picture: string;
      };
      console.log('Decoded token:', decoded);
      
      dispatch(setUser({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      }));
    } catch (error) {
      console.error('Login error:', error);
      dispatch(setError('Failed to decode user information'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleError = () => {
    console.error('Google OAuth Error');
    dispatch(setError('Failed to sign in with Google'));
  };

  const error = useAppSelector((state: RootState) => state.auth.error);
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Weather Dashboard</Title>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          type="standard"
          theme="filled_blue"
          size="large"
          text="signin_with"
          shape="rectangular"
          useOneTap={false}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <div>Loading...</div>}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;