# Contributing to Mosaic

Thank you for contributing to Mosaic. This document provides guidelines and standards for contributing to our codebase.

## Getting Started

1. Fork the repository
2. Create a feature branch
3. Write your code following our standards
4. Submit a pull request

## Development Prerequisites

- Node.js 18+
- npm or yarn
- Git
- VS Code (recommended)

## Code Style

### TypeScript Standards

We use TypeScript for type safety. Always include proper types:

```typescript
// Good
interface ExerciseProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

// Bad
function ExerciseCard(props: any) {
  // ...
}
```

### Component Structure

Components should follow this pattern:

```typescript
// 1. Imports
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface ComponentProps {
  // Props definition
}

// 3. Component
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Implementation
}
```

### Styling Guidelines

Use Tailwind CSS with our conventions:

```typescript
// Good
className={cn(
  "font-modern tracking-wider",
  "p-4 md:p-6",
  "hover:bg-accent"
)}

// Bad
className="custom-class" // No custom CSS classes
```

## Pull Request Process

1. Update documentation if needed
2. Add/update tests
3. Ensure all tests pass
4. Request review from maintainers

## Commit Messages

Follow conventional commits:

```bash
feat: add exercise search functionality
fix: correct video playback issue
docs: update installation guide
```

## Testing Requirements

1. Unit Tests:
```typescript
describe('ExerciseCard', () => {
  it('renders correctly', () => {
    // Test implementation
  });
});
```

2. Integration Tests:
```typescript
describe('Exercise Library', () => {
  it('filters exercises correctly', () => {
    // Test implementation
  });
});
```

## Documentation

Update relevant documentation when:
- Adding new features
- Modifying existing functionality
- Fixing bugs that change behavior

## Code Review Process

1. Automated Checks:
- TypeScript compilation
- Lint rules
- Test coverage
- Build verification

2. Manual Review:
- Code quality
- Performance impact
- Security considerations
- iOS compatibility

## Questions?

- Create an issue for discussions
- Join our developer channel
- Contact the maintainers
