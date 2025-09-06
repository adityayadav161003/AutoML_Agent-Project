# AutoML Frontend

A modern, responsive frontend for the AutoML Agent project built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Login and registration system
- **Homepage Dashboard**: User dashboard with quick stats and navigation
- **Model Builder**: File upload and natural language query interface
- **Progress Animation**: Real-time progress tracking during model training
- **Results Display**: Comprehensive results with performance metrics
- **Download Functionality**: Download trained models and results as ZIP files
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Dropzone** for file uploads
- **Axios** for API calls
- **React Icons** for iconography
- **React Hot Toast** for notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd automl-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.template .env
   ```

4. Update `.env` with your backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`.

## Project Structure

```
automl-frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/           # Reusable components
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   ├── styles/              # Global styles
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Available Pages

1. **Landing Page** (`/`): Login and registration
2. **Home Page** (`/home`): User dashboard
3. **Model Builder** (`/build`): Upload data and create models
4. **Results Page** (`/results/:jobId`): View and download results

## API Integration

The frontend is designed to work with a backend API. Update the following endpoints in your backend:

- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - User registration
- **POST** `/api/build-model` - Upload file and start model training
- **GET** `/api/results/:jobId` - Get model results
- **GET** `/api/download/:jobId` - Download results as ZIP

## Styling

The application uses a modern glassmorphism design with:
- Gradient backgrounds
- Smooth animations and transitions
- Responsive grid layouts
- Custom color palette with blue and purple accents

## Customization

You can customize the styling by:
1. Modifying `tailwind.config.js` for theme changes
2. Updating `src/styles/index.css` for custom styles
3. Changing colors in component classes

## Production Build

To build for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions, please open an issue on the project repository or contact the development team.