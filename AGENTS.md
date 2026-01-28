# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Development Commands

### Build and Development
- `npm run dev` - Start development server (Next.js dev mode)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Testing
This project currently does not have formal tests configured. When adding tests:
- Check package.json for test scripts (none currently exist)
- Consider adding Jest/Vitest for unit tests
- Consider adding Playwright/Cypress for E2E tests

## Code Style Guidelines

### Import Organization
```typescript
// 1. React/Next.js imports
import { useEffect, useState } from "react";
import { cookies } from "next/headers";

// 2. Third-party library imports
import { z } from "zod";
import { cva, type VariantProps } from "class-variance-authority";

// 3. Internal imports (use @/ alias)
import { cn } from "@/lib/utils";
import { HttpClient } from "@/services/http-client";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";
```

### TypeScript Configuration
- Use strict TypeScript settings (already configured)
- Prefer interfaces over types for object shapes
- Use generic types where appropriate: `<T, R>`
- Use Zod for schema validation and type inference

### Component Structure
```typescript
// UI Components (shadcn/ui pattern)
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Use class-variance-authority for component variants
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { /* variants */ },
      size: { /* sizes */ }
    },
    defaultVariants: { /* defaults */ }
  }
)

// Forward ref for better component composition
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
)
```

### Services Pattern
```typescript
// Use centralized HttpClient with consistent error handling
import { HttpClient } from "@/services/http-client";
import { ServiceResponse } from "@/interfaces/common/service-response.interface";

export class ExampleService {
  static async getData(): Promise<ServiceResponse<DataType>> {
    return HttpClient.punchEndPoint<undefined, DataType>({
      url: "/endpoint",
      method: "GET",
      isPublic: false
    });
  }
}
```

### Hooks Pattern
```typescript
// Custom hooks should be prefixed with "use"
// Use TypeScript generics properly
export const useCustomHook = <T>(value: T, delay: number): T => {
  const [state, setState] = useState<T>(value);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return state;
};
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Hooks: `useCamelCase.ts` (e.g., `useLocalStorage.ts`)
- Services: `camelCase.service.ts` (e.g., `users.service.ts`)
- Interfaces: `camelCase.interface.ts` (e.g., `userData.interface.ts`)
- Schemas: `camelCase.schema.ts` (e.g., `login.schema.ts`)

### Directory Structure
```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── common/            # Shared app components
│   ├── auth/              # Authentication components
│   └── opinions/          # Feature-specific components
├── context/               # React contexts
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript interfaces
├── lib/                   # Utility functions
├── schemas/              # Zod validation schemas
└── services/             # API service classes
```

### Error Handling
- Use consistent `ServiceResponse<T>` type for API responses
- Include proper error messages and status codes
- Use try-catch blocks with meaningful error logging
- Handle authentication errors (401) gracefully

### Styling Guidelines
- Use Tailwind CSS for all styling
- Leverage `cn()` utility for conditional classes
- Use `class-variance-authority` for component variants
- Follow shadcn/ui component patterns
- Support dark mode with `dark:` prefixes

### Path Aliases
- Use `@/` prefix for all internal imports
- Resolves to `./src/*` directory
- Configured in `tsconfig.json`

### Form Handling
- Use React Hook Form for form management
- Use Zod schemas for validation with `@hookform/resolvers`
- Create separate schema files for each form type

### API Integration
- All API calls go through centralized `HttpClient`
- Handle authentication tokens automatically
- Support both public and authenticated endpoints
- Use consistent query parameter handling
- Support FormData for file uploads

## Technology Stack
- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Themes**: next-themes for dark mode support
- **Linting**: ESLint with Next.js configuration

## Common Patterns
- Use `async/await` for asynchronous operations
- Implement proper loading states and error boundaries
- Use React Server Components where appropriate
- Leverage Next.js caching strategies
- Implement proper SEO meta tags for pages