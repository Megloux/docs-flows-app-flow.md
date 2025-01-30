# Development Standards and Practices

This document outlines the development standards and practices for the Mosaic project. Following these guidelines ensures consistency and maintainability.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── features/       # Feature-specific components
├── lib/                # Utility functions and helpers
├── stores/             # Zustand state management
└── styles/             # Global styles and themes
```

## Component Development

### Component Pattern

All components should follow this structure:

```typescript
// ExampleComponent.tsx

// 1. Imports - organized by type
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

// 2. Type definitions
interface ComponentProps {
  label: string;
  onChange: (value: string) => void;
}

// 3. Component implementation
export function ExampleComponent({ label, onChange }: ComponentProps) {
  // State management at the top
  const [value, setValue] = useState('');

  // Effects and queries next
  useEffect(() => {
    // Effect implementation
  }, []);

  // Event handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  // Render method last
  return (
    <div className="space-y-4">
      <label>{label}</label>
      <input value={value} onChange={handleChange} />
    </div>
  );
}
```

## State Management

### Zustand Store Pattern

```typescript
// stores/exercise-store.ts

interface ExerciseState {
  // State definition
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  // State implementation
}));
```

### React Query Usage

```typescript
// hooks/use-exercises.ts

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises
  });
}
```

## Styling Standards

### Tailwind Usage

```typescript
// Do: Use cn utility for conditional classes
className={cn(
  "base-styles",
  "responsive-styles",
  "state-variations"
)}

// Don't: Use string concatenation
className={`base-styles ${conditional ? 'active' : ''}`}
```

### Typography

```typescript
// Use Inter font consistently
text-classes = {cn(
  "font-modern",
  "tracking-wider",
  "text-base md:text-lg"
)}
```

## Error Handling

```typescript
// Proper error boundary usage
try {
  // Risky operation
} catch (error) {
  // Proper error handling
  if (error instanceof ApiError) {
    // Handle API errors
  } else {
    // Handle other errors
  }
}
```

## Testing Practices

### Component Testing

```typescript
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
describe('Feature', () => {
  it('works end-to-end', async () => {
    // Setup
    // Action
    // Assertion
  });
});
```

## Performance Guidelines

1. Use React.memo for expensive components:
```typescript
export const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  // Implementation
});
```

2. Implement proper loading states:
```typescript
function LoadingState() {
  return <div className="animate-pulse">Loading...</div>;
}
```

## iOS Compatibility

1. Safe area handling:
```typescript
className={cn(
  "px-4",
  "pt-safe pb-safe" // iOS safe area utilities
)}
```

2. Touch target sizing:
```typescript
className="min-h-[44px] min-w-[44px]" // iOS minimum touch target
```

## Code Review Checklist

Before submitting code:
- TypeScript types are properly defined
- Components follow standard pattern
- Tests are included and passing
- Documentation is updated
- iOS compatibility is maintained
- Performance impact is considered

## Development Tools

Required VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript + Paths

## Build and Deploy

Development:
```bash
npm run dev
```

Production build:
```bash
npm run build
```

iOS preparation:
```bash
npm run build:ios
```
