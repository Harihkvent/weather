import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setTemperatureUnit, setTheme } from '../features/preferencesSlice';
import type { TemperatureUnit } from '../types/weather';
import { RootState } from '../features/store';

const Container = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Section = styled.div`
  margin: 1.5rem 0;

  &:first-child {
    margin-top: 0;
  }
`;

const SectionTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const Button = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.background.primary : theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:first-child {
    margin-left: 0;
  }
`;

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { temperatureUnit, theme } = useAppSelector((state: RootState) => state.preferences);

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    dispatch(setTemperatureUnit(newUnit));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  return (
    <Container>
      <h3>Settings</h3>
      
      <Section>
        <SectionTitle>Temperature Unit</SectionTitle>
        <div>
          <Button
            active={temperatureUnit === 'celsius'}
            onClick={() => handleUnitChange('celsius')}
          >
            Celsius
          </Button>
          <Button
            active={temperatureUnit === 'fahrenheit'}
            onClick={() => handleUnitChange('fahrenheit')}
          >
            Fahrenheit
          </Button>
        </div>
      </Section>

      <Section>
        <SectionTitle>Theme</SectionTitle>
        <div>
          <Button
            active={theme === 'light'}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </Button>
          <Button
            active={theme === 'dark'}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </Button>
        </div>
      </Section>
    </Container>
  );
};

export default Settings;