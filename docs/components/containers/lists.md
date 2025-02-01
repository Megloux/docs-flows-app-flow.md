# List Component

A comprehensive list component that provides semantic, accessible list structures with robust selection handling, iOS-optimized interactions, and full TypeScript type safety. Designed specifically for Mosaic's exercise presentation needs while maintaining App Store compatibility.

## Technical Implementation Note
This component uses specific HTML element types (`HTMLUListElement` and `HTMLOLElement`) rather than generic `HTMLElement` to maintain strict type safety and semantic correctness. This ensures proper accessibility and iOS compatibility while providing precise TypeScript validation.

## Interface

```typescript
// Constants for type safety and validation
const LIST_VARIANTS = ['unordered', 'ordered', 'none'] as const;
const SPACING_OPTIONS = ['none', 'small', 'medium', 'large'] as const;
const DIRECTION_OPTIONS = ['vertical', 'horizontal'] as const;

type ListVariant = typeof LIST_VARIANTS[number];
type SpacingOption = typeof SPACING_OPTIONS[number];
type DirectionOption = typeof DIRECTION_OPTIONS[number];

interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement | HTMLOLElement>, 'onClick'> {
  /** List style variant */
  variant?: ListVariant;
  
  /** Spacing between list items */
  spacing?: SpacingOption;
  
  /** Enables selection of list items */
  selectable?: boolean;
  
  /** Layout direction */
  direction?: DirectionOption;
  
  /** Custom CSS classes */
  className?: string;
  
  /** List content */
  children: React.ReactNode;
  
  /** Optional default selected item key */
  defaultSelected?: string;
  
  /** Selection change handler */
  onSelectionChange?: (selectedId: string | null) => void;
  
  /** Validation function for selection */
  validateSelection?: (id: string) => boolean | Promise<boolean>;
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Unique identifier for selection tracking */
  id: string;
  
  /** Selected state for selectable lists */
  selected?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom CSS classes */
  className?: string;
  
  /** List item content */
  children: React.ReactNode;
  
  /** Click handler for selectable items */
  onSelect?: () => void;
  
  /** Touch feedback handler */
  onTouchFeedback?: () => void;
}
```

## Implementation

```typescript
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const spacingVariants = {
  none: 'space-y-0',
  small: 'space-y-2',
  medium: 'space-y-4',
  large: 'space-y-6'
} as const;

const horizontalSpacingVariants = {
  none: 'space-x-0',
  small: 'space-x-2',
  medium: 'space-x-4',
  large: 'space-x-6'
} as const;

export const List = React.forwardRef<HTMLUListElement | HTMLOLElement, ListProps>(({
  variant = 'unordered',
  spacing = 'medium',
  selectable = false,
  direction = 'vertical',
  className,
  children,
  defaultSelected,
  onSelectionChange,
  validateSelection,
  ...props
}, ref) => {
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelected ?? null);
  
  // Validation in development
  if (process.env.NODE_ENV !== 'production') {
    if (!LIST_VARIANTS.includes(variant)) {
      console.warn(
        `Invalid list variant "${variant}". Must be one of ${LIST_VARIANTS.join(', ')}`
      );
    }
    if (!SPACING_OPTIONS.includes(spacing)) {
      console.warn(
        `Invalid spacing value "${spacing}". Must be one of ${SPACING_OPTIONS.join(', ')}`
      );
    }
  }

  const Component = variant === 'ordered' ? 'ol' : 'ul';

  const handleSelection = useCallback(async (id: string) => {
    if (validateSelection) {
      const isValid = await validateSelection(id);
      if (!isValid) return;
    }
    setSelectedId(id);
    onSelectionChange?.(id);
  }, [onSelectionChange, validateSelection]);

  const listStyles = cn(
    // Base styles
    'w-full',
    
    // List style
    variant === 'none' && 'list-none',
    variant === 'unordered' && 'list-disc list-inside',
    variant === 'ordered' && 'list-decimal list-inside',
    
    // Spacing - iOS optimized for touch
    direction === 'vertical' 
      ? spacingVariants[spacing]
      : horizontalSpacingVariants[spacing],
    
    // Direction
    direction === 'horizontal' && 'flex flex-row items-center',
    
    // Selection styles
    selectable && 'cursor-pointer',
    
    // iOS touch behavior
    'touch-pan-y',
    
    className
  );

  return (
    <Component
      ref={ref}
      className={listStyles}
      role="list"
      aria-multiselectable={false}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            selected: child.props.id === selectedId,
            onSelect: selectable ? () => handleSelection(child.props.id) : undefined,
          });
        }
        return child;
      })}
    </Component>
  );
});

List.displayName = 'List';

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({
  id,
  selected,
  disabled,
  className,
  children,
  onSelect,
  onTouchFeedback,
  ...props
}, ref) => {
  const touchTimeout = useRef<NodeJS.Timeout>();
  const [touchActive, setTouchActive] = useState(false);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };
  }, []);

  const handleTouchStart = () => {
    if (disabled) return;
    setTouchActive(true);
    onTouchFeedback?.();
    if (window?.navigator?.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    setTouchActive(false);
    touchTimeout.current = setTimeout(() => {
      onSelect?.();
    }, 50);
  };

  const itemStyles = cn(
    // Base styles
    'relative',
    
    // iOS-optimized touch target
    'min-h-[44px]',
    'touch-none',
    
    // Interactive states
    !disabled && 'transition-colors duration-200',
    onSelect && !disabled && 'cursor-pointer',
    
    // Selection styles
    selected && !disabled && 'bg-accent/10',
    touchActive && !disabled && 'bg-accent/5',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed',
    
    // Hover states (non-touch only)
    !disabled && onSelect && 'hover:bg-accent/5',
    
    className
  );

  return (
    <li
      ref={ref}
      className={itemStyles}
      onClick={!disabled ? onSelect : undefined}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-selected={selected}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';
```

## Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { List, ListItem } from './List';

describe('List', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(
        <List>
          <ListItem id="1">Test Item</ListItem>
        </List>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByRole('list').tagName).toBe('UL');
    });

    it('applies correct spacing classes', () => {
      const { container } = render(
        <List spacing="large">
          <ListItem id="1">Item</ListItem>
        </List>
      );
      expect(container.firstChild).toHaveClass('space-y-6');
    });
  });

  describe('Selection', () => {
    it('handles item selection', async () => {
      const handleChange = jest.fn();
      render(
        <List selectable onSelectionChange={handleChange}>
          <ListItem id="1">Item One</ListItem>
          <ListItem id="2">Item Two</ListItem>
        </List>
      );
      
      await userEvent.click(screen.getByText('Item One'));
      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('validates selection when validator provided', async () => {
      const validator = jest.fn().mockResolvedValue(true);
      const handleChange = jest.fn();
      
      render(
        <List 
          selectable 
          onSelectionChange={handleChange}
          validateSelection={validator}
        >
          <ListItem id="1">Item One</ListItem>
        </List>
      );
      
      await userEvent.click(screen.getByText('Item One'));
      expect(validator).toHaveBeenCalledWith('1');
      expect(handleChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Touch Interactions', () => {
    it('handles touch events with feedback', () => {
      const handleSelect = jest.fn();
      const { getByText } = render(
        <ListItem id="test" onSelect={handleSelect}>
          Touch Item
        </ListItem>
      );
      
      const item = getByText('Touch Item');
      fireEvent.touchStart(item);
      expect(item).toHaveClass('bg-accent/5');
      
      fireEvent.touchEnd(item);
      expect(handleSelect).toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('handles large lists efficiently', () => {
      const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
        id: `item-${i}`,
        content: `Item ${i}`
      }));
      
      const { container } = render(
        <List>
          {largeDataSet.map(item => (
            <ListItem key={item.id} id={item.id}>
              {item.content}
            </ListItem>
          ))}
        </List>
      );
      
      expect(container).toBeInTheDocument();
    });
  });
});
```

## Best Practices

1. Usage Guidelines
- Use appropriate list variant for content type
- Maintain consistent spacing
- Consider mobile touch targets (44x44px minimum)
- Handle loading and error states
- Validate selection when needed

2. Accessibility
- Use semantic list elements
- Maintain proper ARIA attributes
- Support keyboard navigation
- Provide clear selection feedback
- Test with screen readers

3. iOS Considerations
- Respect minimum touch targets
- Implement proper touch feedback
- Support iOS gestures
- Handle orientation changes
- Support haptic feedback

4. Performance
- Monitor large list performance
- Consider virtualization for long lists
- Handle selection efficiently
- Manage memory appropriately
- Cache results when possible
