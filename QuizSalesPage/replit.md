# Interactive Quiz Sales Page for ENEM Essay Ebook

## Overview

This is a React-based interactive quiz application designed to sell an ENEM essay writing ebook. The application guides users through a persuasive 5-question quiz that identifies their writing difficulties and culminates in a personalized sales pitch for the ebook. Built with modern web technologies, it features a responsive design, smooth animations, and data collection capabilities to track user engagement and conversion rates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks for local state, TanStack Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Animations**: Framer Motion for smooth transitions and engaging user interactions
- **Form Handling**: React Hook Form with Zod validation for robust form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful endpoints following conventional patterns
- **Session Management**: UUID-based session tracking for quiz responses
- **Data Validation**: Zod schemas for runtime type validation and API contract enforcement
- **Storage Pattern**: Abstracted storage interface allowing for easy database swapping

### Database Design
- **Primary Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting
- **Backup Storage**: In-memory storage implementation for development and testing

Key database tables:
- `users`: User authentication and management
- `quiz_responses`: Stores quiz answers, personalized messages, and conversion tracking

### Development Workflow
- **Build System**: Vite for fast development and optimized production builds
- **Development Server**: Hot module replacement with error overlay for enhanced DX
- **Type Checking**: Comprehensive TypeScript configuration across client, server, and shared code
- **Code Organization**: Monorepo structure with shared schema definitions between frontend and backend

### Personalization Engine
The application implements a rule-based personalization system that analyzes quiz responses to generate tailored messaging. This increases conversion rates by addressing specific user pain points identified through their quiz answers.

## External Dependencies

### UI and Design
- **Radix UI**: Accessible component primitives for building the design system
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth user interactions

### Data and API Management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for both client and server-side validation

### Database and Backend
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Express.js**: Web framework for API endpoints

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking across the entire stack
- **ESBuild**: Fast JavaScript bundler for production builds

### Font Loading
- **Google Fonts**: External font loading for typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)

The architecture prioritizes user experience through fast loading times, smooth animations, and responsive design while maintaining data integrity and conversion tracking capabilities.