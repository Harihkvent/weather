# Weather Dashboard

A modern weather dashboard application built with React, Redux, and Google OAuth authentication. Get real-time weather updates, forecasts, and detailed analytics for multiple cities.

## Features

- 🌦 Real-time weather data display
- 📊 Interactive weather visualizations using Recharts
- 🔍 City search with suggestions
- ⭐ Favorite cities management
- 🌡️ Temperature unit conversion (Celsius/Fahrenheit)
- 🔐 Google OAuth authentication
- 📱 Responsive design for all devices

## Technologies Used

- React with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- Google OAuth for authentication
- OpenWeatherMap API for weather data
- Recharts for data visualization

## Getting Started

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
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your API keys:
     ```env
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
     REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
     ```
   
   Note: Never commit the `.env` file to version control. It contains sensitive information and should be kept private.

4. Start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Configuration

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google OAuth API
4. Create credentials (OAuth client ID)
5. Add authorized JavaScript origins and redirect URIs

### OpenWeatherMap API

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Add it to your environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
