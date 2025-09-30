# Problem 2: Fancy Form

- @author: Huyen Ho
- @date: 2025-09-29
- @description: Comprehensive code review exercise analyzing a buggy WalletPage component

## Features

- Token selection with search functionality
- Real-time pricing from Switcheo API
- Input validation and balance checking
- Exchange rate calculations
- Responsive design

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useSwap, useTokens)
├── services/           # API integration
├── types.ts            # TypeScript definitions
└── App.tsx            # Main component
```

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Axios

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run linter
```

## API

Price data: `https://interview.switcheo.com/prices.json`
