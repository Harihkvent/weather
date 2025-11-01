import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWeatherForCity } from '../features/weatherSlice';
import WeatherCard from '../components/WeatherCard';
import DetailedWeather from '../components/DetailedWeather';
import SearchBar from '../components/SearchBar';
import Settings from '../components/Settings';
import { RootState } from '../features/store';
import { WeatherData } from '../types/weather';
import { googleLogout } from '@react-oauth/google';
import { logout } from '../features/authSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: #666;
  font-size: 1.2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #8884d8;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SignOutButton = styled(Button)`
  background-color: #dc3545;
  margin-left: 0.5rem;

  &:hover {
    background-color: #c82333;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useAppDispatch();
  
  const currentWeather = useAppSelector((state: RootState) => state.weather.currentWeather);
  const favorites = useAppSelector((state: RootState) => state.preferences.favoriteCities);

  useEffect(() => {
    // Function to fetch weather for all cities
    const fetchWeatherForAll = async () => {
      const uniqueCities = Array.from(new Set([...favorites]));
      // Use Promise.all to fetch weather data in parallel
      await Promise.all(
        uniqueCities.map(city => dispatch(fetchWeatherForCity(city)))
      );
    };

    // Initial fetch
    fetchWeatherForAll();

    // Set up auto-refresh every 5 minutes (300000ms) instead of every minute
    const refreshInterval = setInterval(fetchWeatherForAll, 300000);

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, [dispatch, favorites]);

  const cities = Object.values(currentWeather) as WeatherData[];

  const handleSignOut = () => {
    try {
      googleLogout();
      dispatch(logout());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Weather Dashboard</h1>
        <Controls>
          <Button onClick={() => setShowSettings(!showSettings)}>
            Settings
          </Button>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Controls>
      </Header>

      <SearchBar />

      {showSettings && <Settings />}

      

      {selectedCity ? (
        <DetailedWeather
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
        />
      ) : cities.length > 0 ? (
        <Grid>
          {cities.map((weather) => (
            <WeatherCard
              key={weather.id}
              weather={weather}
              onClick={() => setSelectedCity(weather.city)}
            />
          ))}
        </Grid>
      ) : (
        <EmptyMessage>
          Search for a city above to see its weather information.
        </EmptyMessage>
      )}
    </Container>
  );
};

export default Dashboard;