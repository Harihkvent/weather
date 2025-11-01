import React from 'react';
import styled from 'styled-components';
import { WeatherData } from '../types/weather';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addFavoriteCity, removeFavoriteCity } from '../features/preferencesSlice';
import { removeCity } from '../features/weatherSlice';

interface WeatherCardProps {
  weather: WeatherData;
  onClick: () => void;
}

interface CardProps {
  loading?: boolean;
}

const Card = styled.div<CardProps>`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  opacity: ${props => props.loading ? 0.7 : 1};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Temperature = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;

const City = styled.h3`
  margin: 0.5rem 0;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  &:first-child {
    margin-right: 0.5rem;
  }
`;

const AqiIndicator = styled.span<{ aqi: number }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  background-color: ${({ aqi }) => {
    if (aqi <= 50) return '#4caf50'; // Good
    if (aqi <= 100) return '#ffeb3b'; // Moderate
    if (aqi <= 150) return '#ff9800'; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return '#f44336'; // Unhealthy
    if (aqi <= 300) return '#9c27b0'; // Very Unhealthy
    return '#880e4f'; // Hazardous
  }};
  color: ${({ aqi }) => aqi <= 100 ? '#000' : '#fff'};
`;

const getAqiLabel = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onClick }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.preferences.favoriteCities);
  const unit = useAppSelector((state) => state.preferences.temperatureUnit);
  const loadingCities = useAppSelector((state) => state.weather.loadingCities);
  
  const isFavorite = favorites.includes(weather.city);
  
  const temp = unit === 'fahrenheit' 
    ? (weather.temperature * 9/5) + 32 
    : weather.temperature;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavoriteCity(weather.city));
    } else {
      dispatch(addFavoriteCity(weather.city));
    }
  };

  return (
    <Card onClick={onClick} loading={loadingCities[weather.city]}>
      <CardHeader>
        <City>{weather.city}</City>
        <div>
          <ActionButton onClick={toggleFavorite}>
            {isFavorite ? '★' : '☆'}
          </ActionButton>
          <ActionButton onClick={(e) => {
            e.stopPropagation();
            dispatch(removeCity(weather.city));
          }}>
            ✕
          </ActionButton>
        </div>
      </CardHeader>
      <Temperature>{Math.round(temp)}°{unit === 'fahrenheit' ? 'F' : 'C'}</Temperature>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
        alt={weather.condition}
      />
      <WeatherInfo>
        <span>
          <strong>{weather.description}</strong>
        </span>
      </WeatherInfo>
      <WeatherInfo>
        <span>💧 {weather.humidity}%</span>
        <span>💨 {weather.windSpeed} m/s</span>
      </WeatherInfo>
      
      {weather.airQuality && (
        <>
          <WeatherInfo>
            <span>Air Quality:</span>
            <AqiIndicator 
              aqi={weather.airQuality.aqi}
              title={`AQI: ${weather.airQuality.aqi} - ${getAqiLabel(weather.airQuality.aqi)}`}
            >
              {getAqiLabel(weather.airQuality.aqi)}
            </AqiIndicator>
          </WeatherInfo>
          <WeatherInfo>
            <span title="PM2.5">PM2.5: {weather.airQuality.pm2_5} µg/m³</span>
            <span title="PM10">PM10: {weather.airQuality.pm10} µg/m³</span>
          </WeatherInfo>
        </>
      )}

      {weather.precipitation > 0 && (
        <WeatherInfo>
          <span>🌧️ {weather.precipitation} mm/h</span>
        </WeatherInfo>
      )}

      {weather.sunrise && weather.sunset && (
        <WeatherInfo>
          <span>🌅 {new Date(weather.sunrise * 1000).toLocaleTimeString()}</span>
          <span>🌇 {new Date(weather.sunset * 1000).toLocaleTimeString()}</span>
        </WeatherInfo>
      )}
    </Card>
  );
};

export default WeatherCard;