import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWeatherForCity } from '../features/weatherSlice';
import { RootState } from '../features/store';
import { searchCities, CitySearchResult } from '../services/geocodingService';

const SearchContainer = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  background-color: #ffebee;
  border-radius: 4px;
  text-align: center;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8884d8;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8884d8;
  }
`;

const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  position: absolute;
  width: 100%;
  top: 100%;
`;

const SearchResultItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const LocationDetails = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9em;
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cityErrors = useAppSelector((state: RootState) => state.weather.cityErrors);
  const loadingCities = useAppSelector((state: RootState) => state.weather.loadingCities);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchCities(searchQuery);
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length >= 3) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query, fetchSuggestions]);

  const handleSearch = (city: CitySearchResult) => {
    dispatch(fetchWeatherForCity({ 
      city: city.name,
      location: { lat: city.lat, lon: city.lon }
    }));
    setQuery('');
    setSuggestions([]);
  };

  return (
    <SearchContainer>
      <InputContainer>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city name (e.g., London, New York)..."
          disabled={false}
        />
        {(isLoading || Object.values(loadingCities).some(loading => loading)) && 
          <LoadingIndicator>Loading...</LoadingIndicator>}
      </InputContainer>
      {query && cityErrors[query] && <ErrorMessage>{cityErrors[query]}</ErrorMessage>}
      {suggestions.length > 0 && !isLoading && !cityErrors[query] && (
        <SearchResults>
          {suggestions.map((city) => (
            <SearchResultItem
              key={`${city.name}-${city.lat}-${city.lon}`}
              onClick={() => handleSearch(city)}
            >
              <span>{city.name}</span>
              <LocationDetails>
                {[city.state, city.country].filter(Boolean).join(', ')}
              </LocationDetails>
            </SearchResultItem>
          ))}
        </SearchResults>
      )}
      {query.length >= 3 && !isLoading && suggestions.length === 0 && (
        <SearchResults>
          <NoResults>No cities found matching your search</NoResults>
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;