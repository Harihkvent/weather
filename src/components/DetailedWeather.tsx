import React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { useAppSelector } from '../hooks/redux';
import { RootState } from '../features/store';

// Only keep the interfaces that are actually used in the component
interface ChartDataPoint {
  time: string;
  temperature: number;
}

interface HourlyForecast {
  time: string;
  temperature: number;
  // include optional additional fields that might be present in hourly data
  [key: string]: any;
}

interface DetailedWeatherProps {
  city: string;
  onClose: () => void;
}

const Container = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 2rem auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const ForecastCard = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background: #f5f5f5;
  text-align: center;
`;

const DetailedWeather: React.FC<DetailedWeatherProps> = ({ city, onClose }) => {
  const weatherData = useAppSelector((state: RootState) => state.weather.currentWeather[city]);
  const forecasts = useAppSelector((state: RootState) => state.weather.forecasts[city]);
  const hourlyForecasts = useAppSelector((state: RootState) => state.weather.hourlyForecasts[city]);
  const unit = useAppSelector((state: RootState) => state.preferences.temperatureUnit);

  const convertTemp = (temp: number) => {
    return unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  };

  if (!weatherData || !forecasts || !hourlyForecasts) {
    return null;
  }

const chartData: ChartDataPoint[] = hourlyForecasts.map((forecast: HourlyForecast): ChartDataPoint => ({
    time: forecast.time,
    temperature: convertTemp(forecast.temperature),
}));

  return (
    <Container>
      <Header>
        <h2>{city} - Detailed Weather</h2>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Header>

      <Section>
        <h3>Current Conditions</h3>
        <div>
          <p>Temperature: {Math.round(convertTemp(weatherData.temperature))}°{unit === 'fahrenheit' ? 'F' : 'C'}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>Pressure: {weatherData.pressure} hPa</p>
          <p>Dew Point: {Math.round(convertTemp(weatherData.dewPoint))}°{unit === 'fahrenheit' ? 'F' : 'C'}</p>
          <p>UV Index: {weatherData.uvIndex}</p>
        </div>
      </Section>

      <Section>
        <h3>Temperature Trend (24 Hours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              fill="#8884d8"
              name={`Temperature (°${unit === 'fahrenheit' ? 'F' : 'C'})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Section>

      <Section>
        <h3>Current Weather Conditions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={[
            {
              subject: 'Temperature',
              value: convertTemp(weatherData.temperature),
              fullMark: 50,
            },
            {
              subject: 'Humidity',
              value: weatherData.humidity,
              fullMark: 100,
            },
            {
              subject: 'Wind Speed',
              value: weatherData.windSpeed,
              fullMark: 20,
            },
            {
              subject: 'Pressure',
              value: (weatherData.pressure - 950) / 2,
              fullMark: 100,
            },
            {
              subject: 'Precipitation',
              value: weatherData.precipitation * 10,
              fullMark: 100,
            },
          ]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Weather Conditions"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Section>

      <Section>
        <h3>5-Day Forecast</h3>
        <ForecastGrid>
          {forecasts.map((forecast) => (
            <ForecastCard key={forecast.date}>
              <p>{new Date(forecast.date).toLocaleDateString()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                alt={forecast.condition}
              />
              <p>{Math.round(convertTemp(forecast.temperature))}°{unit === 'fahrenheit' ? 'F' : 'C'}</p>
              <p>{forecast.condition}</p>
            </ForecastCard>
          ))}
        </ForecastGrid>
      </Section>
    </Container>
  );
};

export default DetailedWeather;