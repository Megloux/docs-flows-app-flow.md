# Section Component

A foundational layout container that provides consistent content organization, spacing, and visual hierarchy for Mosaic's interface. The Section component ensures semantic markup while supporting various content types and nested layouts.

## Interface

```typescript
// Type Definitions
interface Exercise {
  id: string;
  name: string;
  description: string;
}

interface ExercisePreviewProps {
  exercise: Exercise;
}

interface ExerciseDetailsProps {
  exercise: Exercise;
}

// Component Props
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading for the section */
  heading?: string;
  
  /** Controls section padding */
  spacing?: 'none' | 'small' | 'medium' | 'large';
  
  /** Apply hairline border around section */
  bordered?: boolean;
  
  /** Makes section fill available vertical space */
  fullHeight?: boolean;
  
  /** Optional background variant */
  background?: 'default' | 'muted' | 'accent';
  
  /** Custom CSS classes */
  className?: string;
  
  /** Section content */
  children: React.ReactNode;
}
```

## Implementation

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

const spacingVariants = {
  none: '',
  small: 'p-4',
  medium: 'p-6 md:p-8',
  large: 'p-8 md:p-12'
} as const;

const backgroundVariants = {
  default: 'bg-background',
  muted: 'bg-muted',
  accent: 'bg-accent/10'
} as const;

export const Section = React.forwardRef<HTMLElement, SectionProps>(({
  heading,
  spacing = 'medium',
  bordered = false,
  fullHeight = false,
  background = 'default',
  className,
  children,
  ...props
}, ref) => {
  const sectionStyles = cn(
    // Base styles
    'relative w-full rounded-md',
    
    // Spacing
    spacingVariants[spacing],
    
    // Background
    backgroundVariants[background],
    
    // Border
    bordered && 'border-[0.5px] border-border',
    
    // Height
    fullHeight && 'min-h-[100vh]',
    
    // Dark mode
    'dark:bg-background-dark',
    bordered && 'dark:border-border-dark',
    
    className
  );

  return (
    <section
      ref={ref}
      className={sectionStyles}
      {...props}
    >
      {heading && (
        <h2 className={cn(
          "font-modern tracking-wider",
          "text-xl mb-4",
          "text-foreground",
          "dark:text-foreground-dark"
        )}>
          {heading}
        </h2>
      )}
      <div className="w-full">
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';
```

## Usage Examples

### Basic Usage

```typescript
// Simple container
<Section>
  <p>Basic content</p>
</Section>

// With heading and border
<Section 
  heading="Exercise Details"
  bordered
  spacing="large"
>
  <ExerciseContent />
</Section>

// Full height with background
<Section 
  fullHeight 
  background="muted"
  spacing="large"
>
  <PageContent />
</Section>
```

### Integration Patterns

#### Grid Layout
Best for visual card-based presentations:

```typescript
<Section heading="Featured Exercises">
  <Grid columns={2} gap={4}>
    <Card>
      <ExercisePreview 
        exercise={{ 
          id: "1", 
          name: "Modified Plank", 
          description: "Foundational plank variation" 
        }} 
      />
    </Card>
    <Card>
      <ExercisePreview 
        exercise={{ 
          id: "2", 
          name: "High Plank", 
          description: "Advanced plank position" 
        }} 
      />
    </Card>
  </Grid>
</Section>
```

#### List View
Ideal for sequential content:

```typescript
<Section heading="Workout Plan">
  <List spacing="medium">
    {exercises.map((exercise: Exercise) => (
      <ListItem key={exercise.id}>
        <ExerciseItem exercise={exercise} />
      </ListItem>
    ))}
  </List>
</Section>
```

#### Modal Integration
For focused content presentation:

```typescript
<Modal>
  <Section 
    heading="Exercise Details" 
    spacing="small"
    background="muted"
  >
    <ExerciseDetails 
      exercise={{ 
        id: "1", 
        name: "Modified Plank", 
        description: "Foundational plank variation" 
      }} 
    />
  </Section>
</Modal>
```

#### Accordion Integration
For collapsible content sections:

```typescript
<Accordion type="single" collapsible>
  <AccordionItem value="instructions">
    <Section spacing="small">
      <ExerciseInstructions 
        exercise={{ 
          id: "1", 
          name: "Modified Plank", 
          description: "Foundational plank variation" 
        }} 
      />
    </Section>
  </AccordionItem>
  <AccordionItem value="modifications">
    <Section spacing="small">
      <ExerciseModifications 
        exercise={{ 
          id: "1", 
          name: "Modified Plank", 
          description: "Foundational plank variation" 
        }} 
      />
    </Section>
  </AccordionItem>
</Accordion>
```

#### Nested Sections
Use sparingly and only when logical grouping is needed:

```typescript
<Section heading="Workout Program">
  <Section 
    heading="Warm Up" 
    spacing="small"
    bordered
  >
    <WarmUpExercises />
  </Section>
  <Section 
    heading="Main Workout"
    spacing="small"
    bordered
  >
    <MainExercises />
  </Section>
</Section>
```

## Accessibility Features

1. Semantic Structure
- Uses semantic `<section>` element
- Proper heading hierarchy with `<h2>`
- Maintains content relationships
- Clear landmark navigation

2. Screen Reader Support
- Proper ARIA landmarks
- Meaningful headings
- Clear content hierarchy
- Descriptive labels

3. Keyboard Navigation
- Natural tab order
- Proper focus management
- Logical content flow

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Section>Test content</Section>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders heading when provided', () => {
      render(
        <Section heading="Test Heading">
          Content
        </Section>
      );
      expect(screen.getByRole('heading')).toHaveTextContent('Test Heading');
    });

    it('applies correct spacing classes', () => {
      const { container } = render(
        <Section spacing="large">
          Content
        </Section>
      );
      expect(container.firstChild).toHaveClass('p-8');
    });
  });

  describe('Variants', () => {
    it('applies border when bordered prop is true', () => {
      const { container } = render(
        <Section bordered>
          Content
        </Section>
      );
      expect(container.firstChild).toHaveClass('border-[0.5px]');
    });

    it('applies correct background variant', () => {
      const { container } = render(
        <Section background="muted">
          Content
        </Section>
      );
      expect(container.firstChild).toHaveClass('bg-muted');
    });

    it('handles full height option', () => {
      const { container } = render(
        <Section fullHeight>
          Content
        </Section>
      );
      expect(container.firstChild).toHaveClass('min-h-[100vh]');
    });
  });

  describe('Dark Mode', () => {
    it('includes dark mode classes', () => {
      const { container } = render(
        <Section bordered>
          Content
        </Section>
      );
      expect(container.firstChild).toHaveClass('dark:bg-background-dark');
      expect(container.firstChild).toHaveClass('dark:border-border-dark');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      const { container } = render(
        <>
          <Section heading="First Section">Content</Section>
          <Section heading="Second Section">Content</Section>
        </>
      );
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(2);
      headings.forEach(heading => {
        expect(heading.tagName).toBe('H2');
      });
    });
  });
});
```

## Best Practices

1. Usage Guidelines
- Use for major content divisions
- Keep heading hierarchy consistent
- Choose appropriate spacing for content density
- Use borders sparingly for visual hierarchy
- Maintain semantic structure

2. Layout Considerations
- Start with 'medium' spacing by default
- Use fullHeight thoughtfully
- Consider responsive behavior
- Maintain consistent padding patterns
- Plan for content reflow

3. Accessibility
- Always include semantic headings
- Maintain proper heading hierarchy
- Test with screen readers
- Verify dark mode contrast
- Ensure keyboard navigation

4. Performance
- Avoid deeply nested sections
- Monitor padding/margin impact
- Consider content reflow
- Watch for unintended scrolling

5. iOS Considerations
- Respect safe areas
- Maintain minimum touch targets (44x44px)
- Consider gesture interactions
- Handle orientation changes properly
- Support iOS dark mode

6. Integration Guidelines
- Choose appropriate container combinations
- Maintain consistent spacing
- Consider mobile responsiveness
- Follow logical grouping
- Monitor render performance
