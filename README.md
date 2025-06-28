# This is the frontend for Takeaway assignment

🍽️ Restaurant Finder - React Application
A  restaurant discovery app built with:

⭐ React 19 with TypeScript strict typing

⭐ Redux Toolkit & Redux-Saga for state management

⭐ Vite for fast development and production builds

⭐ Jest (unit) + Playwright (E2E) for testing

⭐ ESLint, Prettier for code quality

⭐ Docker containerization with multi-stage builds

⭐ Responsive design

⭐ API error handling and loading states

🚀 Quick Start

````bash

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run tests
npm test          # Unit tests
npm run e2e       # End-to-end tests

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview

````

🌐 API Integration
The app integrates with the Justeat API to fetch restaurant data.

Development Mode
Uses Vite proxy in vite.config.ts

Routes /api/* to the restaurant API

Handles CORS automatically

Production Mode


# Create .env file

cp .env.example .env

# Add your API key

VITE_APP_GOOGLE_MAPS_API_KEY=your_api_key_here

🧪 Testing
Unit Tests
bash
npm test          # Run all tests
npm test:watch    # Watch mode
npm test:coverage # Generate coverage report
E2E Tests
bash
npm run e2e       # Run against dev server

