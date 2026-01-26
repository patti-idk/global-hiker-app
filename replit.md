# Montiq Expedition - Hiking Route Tracker

## Overview

Montiq Expedition is a hiking and trail exploration application that allows users to discover, track, and plan global hiking routes. The app features interactive 3D maps powered by Mapbox, a route management system, companion collaboration with voting features, and a modern expedition-themed UI. The interface is presented in Traditional Chinese (Taiwan locale).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with custom expedition-themed design system (DM Sans + Oswald fonts)
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for smooth UI transitions
- **Maps**: Mapbox GL JS with react-map-gl wrapper, featuring 3D terrain visualization
- **Build Tool**: Vite with custom Replit plugins for development

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ES modules
- **API Design**: REST API with typed contracts using Zod schemas in `shared/routes.ts`
- **Request Handling**: JSON body parsing with raw body preservation for webhooks

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - defines routes, companions, and votes tables
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # UI components including MapComponent
│   │   ├── pages/        # Route pages (Home, RouteList, GlobalMap, Companions)
│   │   ├── hooks/        # Custom React hooks for data fetching
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client and server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API contract definitions with Zod
└── migrations/       # Database migrations
```

### Key Design Patterns
- **Repository Pattern**: `DatabaseStorage` class in `storage.ts` abstracts database operations
- **Typed API Contracts**: Shared route definitions ensure type safety between frontend and backend
- **Component Composition**: shadcn/ui components built on Radix primitives for accessibility

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Third-Party Services
- **Mapbox GL JS**: Interactive 3D map rendering
  - Access Token: Configured in `client/requirements.md`
  - Style: `mapbox://styles/mapbox/outdoors-v12`
  - Features: 3D terrain with `mapbox-dem` source

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animation library
- `mapbox-gl` / `react-map-gl`: Map visualization
- `drizzle-orm` / `drizzle-zod`: Database ORM and schema validation
- `zod`: Runtime type validation
- `wouter`: Client-side routing
- `lucide-react`: Icon library