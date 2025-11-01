import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setTemperatureUnit } from '../features/preferencesSlice';
import type { TemperatureUnit } from '../types/weather';
import { RootState } from '../features/store';

const Container = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin: 1rem 0;
`;

const Button = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: 2px solid #8884d8;
  border-radius: 4px;
  background: ${props => props.active ? '#8884d8' : 'white'};
  color: ${props => props.active ? 'white' : '#8884d8'};
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const unit = useAppSelector((state: RootState) => state.preferences.temperatureUnit);

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    dispatch(setTemperatureUnit(newUnit));
  };

  return (
    <Container>
      <h3>Settings</h3>
      
      <Section>
        <h4>Temperature Unit</h4>
        <div>
          <Button
            active={unit === 'celsius'}
            onClick={() => handleUnitChange('celsius')}
          >
            Celsius
          </Button>
          <Button
            active={unit === 'fahrenheit'}
            onClick={() => handleUnitChange('fahrenheit')}
          >
            Fahrenheit
          </Button>
        </div>
      </Section>
    </Container>
  );
};

export default Settings;