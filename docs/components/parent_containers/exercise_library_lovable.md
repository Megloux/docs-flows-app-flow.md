docs/components/ExerciseLibraryComplete.md
# ExerciseLibrary Component Documentation

## Overview
The ExerciseLibrary component serves as the primary interface for browsing, filtering, and managing exercise content. It implements a responsive, accessible interface supporting both grid and list views, with advanced filtering and categorization capabilities.

## Component Architecture

### Component Hierarchy
```tsx
<ExerciseLibrary>
  ├── Header
  │   ├── Title ("EXERCISE LIBRARY")
  │   └── ViewToggle (Grid/List)
  │
  ├── SearchAndFilters
  │   ├── SearchBar
  │   │   └── SearchInput (with debounced input)
  │   └── CategoryFilter
  │       └── ScrollArea (horizontal scroll)
  │
  ├── ExerciseDisplay
  │   ├── GridView
  │   │   └── ExerciseCard
  │   │       ├── Thumbnail
  │   │       ├── Title
  │   │       ├── Duration
  │   │       └── Actions
  │   └── ListView
  │       └── ExerciseListItem
  │           ├── Thumbnail
  │           ├── Details
  │           └── Actions
  │
  └── MobileLayout
      └── ResponsiveContainer
```

### Core Features
1. View Management
   - Grid/List toggle with persistent preference
   - Smooth transitions between views
   - Responsive breakpoints
   - Touch-friendly interactions

2. Search & Filtering
   - Real-time search with debouncing (300ms)
   - Multi-select category filtering
   - Combined filter logic
   - Search history tracking
   - Filter reset capability

3. Exercise Display
   - Optimized image loading
   - Placeholder states
   - Error boundaries
   - Loading skeletons

4. Mobile Experience
   - Touch gestures
   - Swipe actions
   - Pull-to-refresh
   - Bottom sheet modals
   - Safe area handling

## TypeScript Interfaces

### Props
```typescript
interface ExerciseLibraryProps {
  /** Initial view mode */
  defaultView?: 'grid' | 'list';
  
  /** Initial category selection */
  defaultCategory?: ExerciseCategory[];
  
  /** Custom class names */
  className?: string;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Error state */
  error?: Error;
  
  /** Callback when view changes */
  onViewChange?: (view: ViewMode) => void;
  
  /** Callback when category changes */
  onCategoryChange?: (categories: ExerciseCategory[]) => void;
  
  /** Callback when search query changes */
  onSearch?: (query: string) => void;
  
  /** Callback when exercise is selected */
  onExerciseSelect?: (exercise: Exercise) => void;
}

interface ViewMode {
  type: 'grid' | 'list';
  columns?: 1 | 2 | 3 | 4;
}

interface ExerciseDisplayProps {
  exercises: Exercise[];
  view: ViewMode;
  isLoading?: boolean;
  onSelect: (exercise: Exercise) => void;
  onInfo: (exercise: Exercise) => void;
}
```

### State Management
```typescript
interface ExerciseState {
  view: ViewMode;
  selectedCategories: ExerciseCategory[];
  searchQuery: string;
  selectedExercise: Exercise | null;
  isLoading: boolean;
  error: Error | null;
  page: number;
  hasMore: boolean;
}

// Local state hooks
const [view, setView] = useState<ViewMode>({ type: 'grid', columns: 3 });
const [selectedCategories, setSelectedCategories] = useState<ExerciseCategory[]>([]);
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery] = useDebounce(searchQuery, 300);
```

## Display Specifications

### Grid Layout
```css
/* Core Layout */
.exercise-grid {
  @apply grid gap-4 w-full p-4;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* Responsive Breakpoints */
@screen sm { grid-template-columns: repeat(1, 1fr); }
@screen md { grid-template-columns: repeat(2, 1fr); }
@screen lg { grid-template-columns: repeat(3, 1fr); }
@screen xl { grid-template-columns: repeat(4, 1fr); }

/* Card Dimensions */
.exercise-card {
  @apply min-w-[250px] aspect-video;
}
```

### List Layout
```css
/* Core Layout */
.exercise-list {
  @apply flex flex-col gap-3 w-full p-4;
}

/* List Item */
.exercise-item {
  @apply h-18 p-3 flex items-center gap-4;
}

/* Thumbnail */
.exercise-thumbnail {
  @apply w-24 h-16 object-cover rounded;
}
```

## Accessibility Implementation

### ARIA Attributes
```tsx
// View Toggle
<button
  role="switch"
  aria-checked={view.type === 'grid'}
  aria-label="Toggle view mode"
>

// Search Input
<input
  role="searchbox"
  aria-label="Search exercises"
  aria-expanded={showSuggestions}
>

// Category Filter
<div role="group" aria-label="Filter by category">
```

### Keyboard Navigation
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'ArrowRight':
      focusNextExercise();
      break;
    case 'ArrowLeft':
      focusPreviousExercise();
      break;
    case 'Enter':
      selectCurrentExercise();
      break;
    case 'Escape':
      clearFilters();
      break;
  }
};
```

### Screen Reader Support
```tsx
// Live Region for Updates
<div
  role="status"
  aria-live="polite"
  className="sr-only"
>
  {`${filteredExercises.length} exercises found`}
</div>

// Loading State
<div aria-busy={isLoading}>
  {isLoading ? 'Loading exercises...' : children}
</div>
```

## Performance Optimizations

### Image Loading
```typescript
const ImageLoader: React.FC<ImageProps> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!loaded && <Skeleton />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};
```

### State Updates
```typescript
// Debounced Search
const debouncedSearch = useCallback(
  debounce((query: string) => {
    setSearchQuery(query);
  }, 300),
  []
);

// Throttled Scroll
const handleScroll = useCallback(
  throttle(() => {
    if (isNearBottom() && hasMore && !isLoading) {
      loadMore();
    }
  }, 200),
  [hasMore, isLoading]
);
```

### Data Management
```typescript
// Infinite Scroll Implementation
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['exercises', filters],
  queryFn: fetchExercisePage,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});

// Virtual List
const rowVirtualizer = useVirtualizer({
  count: exercises.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 72,
});
```

## Error Handling

### User Feedback
```typescript
const handleError = (error: Error) => {
  toast({
    title: "Error loading exercises",
    description: error.message,
    variant: "destructive",
  });
};

// Error Boundary
class ExerciseErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Recovery Strategies
```typescript
const retryOperation = async (operation: () => Promise<void>, maxAttempts = 3) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await operation();
      return;
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};
```

## Mobile Implementation

### Touch Interactions
```typescript
const TouchHandler: React.FC = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrevious();
      setTouchStart(null);
    }
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setTouchStart(null)}
    >
      {children}
    </div>
  );
};
```

### Responsive Design
```css
/* Mobile-First Approach */
.exercise-container {
  @apply w-full px-4;
  
  @screen sm {
    @apply px-6;
  }
  
  @screen md {
    @apply px-8;
  }
  
  @screen lg {
    @apply px-12 max-w-7xl mx-auto;
  }
}

/* Touch Targets */
.interactive-element {
  @apply min-h-[44px] min-w-[44px];
}
```

## Testing Strategy

### Unit Tests
```typescript
describe('ExerciseLibrary', () => {
  it('renders in grid view by default', () => {
    const { getByTestId } = render(<ExerciseLibrary />);
    expect(getByTestId('grid-view')).toBeInTheDocument();
  });

  it('toggles between grid and list views', async () => {
    const { getByRole, queryByTestId } = render(<ExerciseLibrary />);
    const toggleButton = getByRole('switch');
    
    await userEvent.click(toggleButton);
    expect(queryByTestId('list-view')).toBeInTheDocument();
  });

  it('filters exercises by category', async () => {
    const { getByRole, getAllByTestId } = render(<ExerciseLibrary />);
    const filterButton = getByRole('button', { name: /abs/i });
    
    await userEvent.click(filterButton);
    const exercises = getAllByTestId('exercise-card');
    exercises.forEach(exercise => {
      expect(exercise).toHaveAttribute('data-category', 'abs');
    });
  });
});
```

### Integration Tests
```typescript
describe('ExerciseLibrary Integration', () => {
  it('handles search and filter combination', async () => {
    const { getByRole, getByPlaceholderText, queryAllByTestId } = render(
      <ExerciseLibrary />
    );
    
    // Select category
    await userEvent.click(getByRole('button', { name: /abs/i }));
    
    // Enter search term
    const searchInput = getByPlaceholderText('Search exercises...');
    await userEvent.type(searchInput, 'crunch');
    
    // Wait for debounced search
    await waitFor(() => {
      const results = queryAllByTestId('exercise-card');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(result => {
        expect(result).toHaveAttribute('data-category', 'abs');
        expect(result).toHaveTextContent(/crunch/i);
      });
    });
  });
});
```

### E2E Tests
```typescript
describe('ExerciseLibrary E2E', () => {
  it('completes exercise selection flow', async () => {
    cy.visit('/exercise-library');
    
    // Select category
    cy.get('[data-testid="category-filter"]')
      .contains('Abs')
      .click();
    
    // Search for exercise
    cy.get('[data-testid="search-input"]')
      .type('crunch');
    
    // Select exercise
    cy.get('[data-testid="exercise-card"]')
      .first()
      .click();
    
    // Verify selection
    cy.get('[data-testid="selected-exercise"]')
      .should('exist');
  });
});
```

## Dependencies
- @radix-ui/react-scroll-area
- @tanstack/react-query
- lucide-react
- tailwind-merge
- clsx

## Related Components
- ExerciseCard
- ExerciseListItem
- SearchBar
- CategoryFilter
- ViewToggle

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
