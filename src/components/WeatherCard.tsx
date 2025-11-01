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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <City>{weather.city}</City>
        <div>
          <button onClick={toggleFavorite} style={{ marginRight: '0.5rem' }}>
            {isFavorite ? '★' : '☆'}
          </button>
          <button onClick={(e) => {
            e.stopPropagation();
            dispatch(removeCity(weather.city));
          }}>
            ✕
          </button>
        </div>
      </div>
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
      {weather.precipitation > 0 && (
        <WeatherInfo>
          <span>🌧️ {weather.precipitation} mm/h</span>
        </WeatherInfo>
      )}
    </Card>
  );
};

export default WeatherCard;