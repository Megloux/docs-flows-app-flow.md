Let's document the Grid component, following the same comprehensive structure we established with the Section component. This is particularly important as the Grid component works closely with the Section component we just documented.


# Grid Component

A flexible layout component that provides responsive grid-based organization using CSS Grid. The Grid component enables consistent multi-column layouts while maintaining proper spacing and alignment across different screen sizes.

## Interface

```typescript
// Constants for type safety
const VALID_COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const VALID_SPANS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

type ValidColumn = typeof VALID_COLUMNS[number];
type ValidSpan = typeof VALID_SPANS[number];
type Breakpoint = typeof BREAKPOINTS[number];

type ResponsiveColumns = {
  [key in Breakpoint]?: ValidColumn;
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the grid (1-12) */
  columns?: ValidColumn | ResponsiveColumns;
  
  /** Gap between grid items */
  gap?: 'small' | 'medium' | 'large';
  
  /** Alignment of grid items along the inline axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Alignment of grid items along the block axis */
  justify?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Allow items to flow into auto-placed rows */
  flow?: 'row' | 'column' | 'dense';
  
  /** Custom CSS classes */
  className?: string;
  
  /** Grid content */
  children: React.ReactNode;
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns this item should span (1-12) */
  colSpan?: ValidSpan;
  
  /** Number of rows this item should span (1-12) */
  rowSpan?: ValidSpan;
  
  /** Start position (column) (1-12) */
  colStart?: ValidSpan;
  
  /** Start position (row) (1-12) */
  rowStart?: ValidSpan;
  
  /** Custom CSS classes */
  className?: string;
  
  /** Grid item content */
  children: React.ReactNode;
}
```

## Implementation

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

const gapVariants = {
  small: 'gap-2',
  medium: 'gap-4',
  large: 'gap-6'
} as const;

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(({
  columns = 1,
  gap = 'medium',
  align = 'stretch',
  justify = 'start',
  flow = 'row',
  className,
  children,
  ...props
}, ref) => {
  // Validate columns at runtime in development
  if (process.env.NODE_ENV !== 'production') {
    if (typeof columns === 'number' && !VALID_COLUMNS.includes(columns)) {
      console.warn(`Invalid column count ${columns}. Must be between 1-12.`);
    }
    if (typeof columns === 'object') {
      Object.entries(columns).forEach(([bp, cols]) => {
        if (!BREAKPOINTS.includes(bp as Breakpoint)) {
          console.warn(`Invalid breakpoint ${bp}. Must be one of ${BREAKPOINTS.join(', ')}`);
        }
        if (!VALID_COLUMNS.includes(cols as ValidColumn)) {
          console.warn(`Invalid column count ${cols} at breakpoint ${bp}. Must be between 1-12.`);
        }
      });
    }
  }

  const gridStyles = cn(
    // Base styles
    'grid w-full',
    
    // Responsive columns
    typeof columns === 'number'
      ? `grid-cols-1 md:grid-cols-${columns}`
      : Object.entries(columns).map(([bp, cols]) => 
          `${bp}:grid-cols-${cols}`
        ).join(' '),
    
    // Gap
    gapVariants[gap],
    
    // Alignment
    `items-${align}`,
    `justify-${justify}`,
    
    // Flow
    `grid-flow-${flow}`,
    
    className
  );

  return (
    <div
      ref={ref}
      className={gridStyles}
      {...props}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({
  colSpan,
  rowSpan,
  colStart,
  rowStart,
  className,
  children,
  ...props
}, ref) => {
  // Validate spans at runtime in development
  if (process.env.NODE_ENV !== 'production') {
    if (colSpan && !VALID_SPANS.includes(colSpan)) {
      console.warn(`Invalid colSpan ${colSpan}. Must be between 1-12.`);
    }
    if (rowSpan && !VALID_SPANS.includes(rowSpan)) {
      console.warn(`Invalid rowSpan ${rowSpan}. Must be between 1-12.`);
    }
    if (colStart && !VALID_SPANS.includes(colStart)) {
      console.warn(`Invalid colStart ${colStart}. Must be between 1-12.`);
    }
    if (rowStart && !VALID_SPANS.includes(rowStart)) {
      console.warn(`Invalid rowStart ${rowStart}. Must be between 1-12.`);
    }
  }

  const itemStyles = cn(
    // Column span
    colSpan && `col-span-${colSpan}`,
    
    // Row span
    rowSpan && `row-span-${rowSpan}`,
    
    // Start positions
    colStart && `col-start-${colStart}`,
    rowStart && `row-start-${rowStart}`,
    
    className
  );

  return (
    <div
      ref={ref}
      className={itemStyles}
      {...props}
    >
      {children}
    </div>
  );
});

GridItem.displayName = 'GridItem';
```

## Usage Examples

### Basic Usage

```typescript
// Simple two-column grid
<Grid columns={2} gap="medium">
  <GridItem>Column 1</GridItem>
  <GridItem>Column 2</GridItem>
</Grid>

// Responsive columns
<Grid 
  columns={{
    base: 1,    // Mobile
    md: 2,      // Tablet
    lg: 3       // Desktop
  }}
  gap="large"
>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// With column spans
<Grid columns={4} gap="medium">
  <GridItem colSpan={2}>Wide Item</GridItem>
  <GridItem>Normal Item</GridItem>
  <GridItem>Normal Item</GridItem>
</Grid>
```

### Integration Examples

```typescript
// Exercise Grid with Cards
<Section heading="Featured Exercises">
  <Grid 
    columns={{ base: 1, md: 2, lg: 3 }} 
    gap="large"
  >
    {exercises.map((exercise) => (
      <GridItem key={exercise.id}>
        <Card>
          <CardHeader>
            <CardTitle>{exercise.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src={exercise.thumbnailUrl} 
              alt={exercise.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-2">{exercise.description}</p>
          </CardContent>
        </Card>
      </GridItem>
    ))}
  </Grid>
</Section>

// Dashboard Layout
<Grid columns={12} gap="small">
  {/* Sidebar */}
  <GridItem colSpan={3} rowSpan={2}>
    <Sidebar />
  </GridItem>
  
  {/* Main content */}
  <GridItem colSpan={9}>
    <MainContent />
  </GridItem>
  
  {/* Stats row */}
  <GridItem colSpan={9}>
    <StatsRow />
  </GridItem>
</Grid>
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Grid, GridItem } from './Grid';

describe('Grid', () => {
  describe('Type Safety', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('warns about invalid column counts', () => {
      render(
        <Grid columns={13}>
          <div>Content</div>
        </Grid>
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid column count 13')
      );
    });

    it('validates GridItem spans', () => {
      render(
        <GridItem colSpan={13}>
          Content
        </GridItem>
      );
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid colSpan 13')
      );
    });
  });

  describe('Rendering', () => {
    it('renders with responsive columns', () => {
      const { container } = render(
        <Grid columns={{ base: 1, md: 2, lg: 3 }}>
          <div>Item</div>
        </Grid>
      );
      expect(container.firstChild).toHaveClass('base:grid-cols-1');
      expect(container.firstChild).toHaveClass('md:grid-cols-2');
      expect(container.firstChild).toHaveClass('lg:grid-cols-3');
    });

    it('applies gap correctly', () => {
      const { container } = render(
        <Grid gap="large">
          <div>Item</div>
        </Grid>
      );
      expect(container.firstChild).toHaveClass('gap-6');
    });
  });

  describe('GridItem', () => {
    it('applies spans correctly', () => {
      const { container } = render(
        <GridItem colSpan={2} rowSpan={3}>
          Content
        </GridItem>
      );
      expect(container.firstChild).toHaveClass('col-span-2');
      expect(container.firstChild).toHaveClass('row-span-3');
    });
  });
});
```

## Best Practices

1. Layout Guidelines
- Use appropriate column counts for content type
- Start with mobile-first design
- Keep layouts consistent across breakpoints
- Use column spans thoughtfully
- Consider content reflow

2. Performance
- Avoid deeply nested grids
- Monitor reflow performance
- Consider lazy loading for grid items
- Watch memory usage with large grids
- Test with varying content amounts

3. Accessibility
- Maintain logical reading order
- Ensure keyboard navigation works
- Test with screen readers
- Verify focus management
- Consider content relationships

4. iOS Considerations
- Account for safe areas
- Handle orientation changes properly
- Maintain minimum touch targets (44x44px)
- Test on different iOS devices
- Consider notched displays

5. Common Patterns
- Use Grid with Section for page layouts
- Combine with Card for item displays
- Implement responsive designs
- Handle loading states
- Plan for error states
