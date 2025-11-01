# Weather Dashboard

A modern weather dashboard application built with React, Redux, and Google OAuth authentication. Get real-time weather updates, forecasts, and detailed analytics for multiple cities, including air quality data and location-based weather information. This repository contains the frontend React app (TypeScript) plus configuration for deployments (Netlify / Vercel) and simple build optimization scripts.

## Features

- 🌦 Real-time weather data display with automatic 5-minute updates
- 📍 Location-based weather tracking using browser geolocation
- � Air Quality Index (AQI) monitoring with visual indicators
- �📊 Interactive weather visualizations using Recharts
- 🔍 City search with suggestions
- ⭐ Favorite cities management with persistent storage
- 🌡️ Temperature unit conversion (Celsius/Fahrenheit)
- 🎨 Dark/Light theme support
- 🔐 Google OAuth authentication
- 📱 Responsive design for all devices
- 🌅 Sunrise and sunset times
- 🌬️ Detailed air quality metrics (PM2.5, PM10, etc.)
- ⚡ Real-time updates and data persistence

## Technologies Used

- React with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- Google OAuth for authentication
- OpenWeatherMap API for weather data
- Recharts for data visualization
- Browser Geolocation API
- LocalStorage for data persistence

## Data Persistence

The application maintains the following data locally:
- User authentication state
- Favorite cities
- Theme preference (light/dark)
- Temperature unit preference
- Recent searches

## Features in Detail

### Weather Data
- Real-time weather information
- 5-day forecast
- Hourly predictions
- Air quality monitoring
- UV index
- Precipitation data
- Wind speed and direction
- Sunrise and sunset times

### Air Quality Index (AQI)
The application provides detailed air quality information:
- Overall AQI score with color-coded indicators
- PM2.5 and PM10 particle measurements
- Individual pollutant levels (CO, NO2, O3, SO2)
- Health recommendations based on AQI levels

### Location Features
- Automatic location detection
- Manual city search
- Favorite locations management
- Multiple city monitoring
- Location-based weather alerts

### User Experience
- Dark/Light theme support
- Temperature unit conversion
- Responsive design for all devices
- Real-time data updates
- Intuitive weather visualizations
- Accessibility features
- Offline support

## Getting Started

Follow these steps to run the project locally.

1. Clone the repository:

```bash
git clone https://github.com/Harihkvent/weather.git
cd weather
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

- Copy `.env.example` to `.env` (Unix/macOS):

```bash
cp .env.example .env
```

- Or on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

- Edit `.env` and add your keys:

```env
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key_here
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Note: Do NOT commit your `.env` file. It contains secrets.

### OpenWeather API Requirements

This application uses the following OpenWeather API endpoints:
- Current Weather Data
- 5 Day / 3 Hour Forecast
- Air Pollution Data

Make sure your API key has access to these endpoints. You can check your subscription level and enable these services in your OpenWeather account.

4. Start the development server:

```bash
npm start
```

Open http://localhost:3000 in your browser.

Quick build & serve (production build served locally):

```bash
npm run build
npm run serve
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

Additional helpful scripts in this repo:

- `npm run serve` - Serve the production `build` directory locally (`serve -s build`)
- `npm run build-and-serve` - Build then serve (convenience wrapper)

The application includes automatic optimization scripts that run during the build process:
- Image optimization for better performance
- Meta tag updates for SEO
- Bundle size optimization

Development features:
- Hot reloading
- TypeScript type checking
- ESLint integration
- Prettier code formatting
- Environment variable validation

## Configuration

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google OAuth API
4. Create credentials (OAuth client ID)
5. Add authorized JavaScript origins and redirect URIs
6. Enable necessary scopes:
   - profile
   - email

### OpenWeatherMap API

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Subscribe to the necessary APIs:
   - Current Weather Data
   - 5 Day / 3 Hour Forecast
   - Air Pollution API
3. Get your API key
4. Add it to your environment variables

### Browser Permissions

The application requires the following browser permissions:
- Geolocation (for location-based weather)
- Local Storage (for data persistence)
- Notifications (for weather alerts)

### Deployment Configurations

The repository includes configuration files for:
- Netlify (`netlify.toml`)
- Vercel (`vercel.json`)
- Development optimization (`scripts/optimize-build.js`)

Security headers and CSP policies are preconfigured for:
- XSS protection
- Content Security Policy
- Frame protection
- Referrer Policy

## Contributing

We welcome contributions! Below are guidelines to make collaboration smooth.

1. Fork the repository
2. Create a descriptive feature branch from `main`:

```bash
git checkout -b feat/short-description
```

3. Keep commits small and focused. Use clear messages (Conventional Commits are recommended, e.g. `feat: add search debounce`).

4. Run existing tests and linters (if adding logic or UI changes):

```bash
npm test
# and format/lint as configured (prettier is included)
```

5. Push your branch and open a Pull Request against `main`. In your PR description include:

- What you changed and why
- Screenshots or gif for UI changes
- Any migration or environment changes required

6. Maintainers will review and request changes if needed. Once approved, your PR will be merged.

PR checklist (what reviewers will look for):

- The change implements a single purpose and is covered by tests where appropriate
- Follows code style (TypeScript types where applicable, use of Redux Toolkit patterns)
- No sensitive keys or credentials committed
- Update documentation (this README or inline comments) if public behavior changed

Reporting issues

- Please open a GitHub Issue for bugs or larger feature requests. Provide steps to reproduce, expected vs actual behavior, and environment (browser/version).

Communication & collaboration

- Use GitHub Issues and Pull Requests as the primary collaboration channels.
- If you need to discuss a large design change, open an Issue or Draft PR and request feedback.

Code of Conduct

- Be respectful and constructive. If you want a formal Code of Conduct added, open an Issue and we can include one in the repo (e.g., Contributor Covenant).

Maintainers and Reviewers

- The project owner(s) listed on GitHub will perform reviews. If your PR needs a reviewer, request one using the GitHub UI.

Want to contribute more?

- Add tests for uncovered behavior in `src/` and update `setupTests.ts` if necessary.
- Add or improve documentation under `docs/` or in README sections.
- Suggest CI workflows (GitHub Actions) or a PR template via `.github/` if you'd like to standardize contributions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
