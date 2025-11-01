import axios from 'axios';
import { config } from '../config/env';

const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0';

export interface CitySearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const searchCities = async (query: string): Promise<CitySearchResult[]> => {
  try {
    if (query.length < 3) return [];

    const response = await axios.get(`${GEOCODING_API_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: config.openWeatherApiKey
      }
    });

    return response.data.map((city: any) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon
    }));
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};