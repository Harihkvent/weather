import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWeatherForCity } from '../features/weatherSlice';
import { RootState } from '../features/store';

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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResultItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const cityErrors = useAppSelector((state: RootState) => state.weather.cityErrors);
  const loadingCities = useAppSelector((state: RootState) => state.weather.loadingCities);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length >= 3) {
        // For now, we'll directly search for the city when typed
        // Later we can add city suggestions from a geocoding API
        setSuggestions([query]);
      } else {
        setSuggestions([]);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (city: string) => {
    dispatch(fetchWeatherForCity({ city }));
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
        {Object.values(loadingCities).some(loading => loading) && 
          <LoadingIndicator>Loading...</LoadingIndicator>}
      </InputContainer>
      {query && cityErrors[query] && <ErrorMessage>{cityErrors[query]}</ErrorMessage>}
      {suggestions.length > 0 && !loadingCities[query] && !cityErrors[query] && (
        <SearchResults>
          {suggestions.map((city) => (
            <SearchResultItem
              key={city}
              onClick={() => handleSearch(city)}
            >
              {city}
            </SearchResultItem>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;