# FavoriteButton Component

The FavoriteButton extends StandardButton to provide a consistent favoriting mechanism across Mosaic. It implements a toggle state with appropriate visual feedback and maintains synchronization with the application's global state.

## Interface

```typescript
interface FavoriteButtonProps extends Omit<StandardButtonProps, 'variant' | 'children'> {
  /** ID of the exercise or routine being favorited */
  itemId: string;
  
  /** Current favorite status */
  isFavorited: boolean;
  
  /** Optional callback when favorite status changes */
  onFavoriteChange?: (itemId: string, newStatus: boolean) => void;
  
  /** Optional label for accessibility */
  ariaLabel?: string;
}
```

## Design Implementation

### Typography and Visual Design
```typescript
const favoriteButtonStyles = cn(
  // Inherit StandardButton base styles
  buttonStyles,
  
  // Specific styling for favorite state
  "relative group",
  isFavorited && [
    "text-amber-500",
    "hover:text-amber-600",
    "dark:text-amber-400"
  ],
  
  // Animation container
  "overflow-hidden"
);

const iconStyles = cn(
  "transition-transform duration-200",
  isFavorited ? "scale-100" : "scale-90"
);
```

### Motion Design
```typescript
const favoriteAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.2 }
};
```

## Accessibility Features

1. Keyboard Navigation
   - Full keyboard support inherited from StandardButton
   - Toggle state with Space or Enter

2. Screen Reader Support
   - Dynamic ARIA labels reflecting current state
   - Status announcements on toggle
   - Clear state indication

3. Touch Optimization
   - Maintained minimum touch target
   - Clear active state feedback
   - Haptic feedback support

## Usage Examples

```typescript
// Basic Implementation
<FavoriteButton
  itemId="exercise-123"
  isFavorited={isFavorited}
  onFavoriteChange={handleFavoriteChange}
/>

// With Custom Aria Label
<FavoriteButton
  itemId="routine-456"
  isFavorited={isFavorited}
  ariaLabel="Add this routine to favorites"
/>

// Within Exercise Card
<ExerciseCard>
  <FavoriteButton
    itemId={exercise.id}
    isFavorited={exercise.isFavorited}
    onFavoriteChange={updateExerciseFavoriteStatus}
  />
</ExerciseCard>
```

## Testing

```typescript
describe('FavoriteButton', () => {
  describe('Rendering', () => {
    it('renders in initial unfavorited state', () => {
      render(
        <FavoriteButton
          itemId="test-123"
          isFavorited={false}
        />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Interaction', () => {
    it('toggles favorite state on click', async () => {
      const handleChange = jest.fn();
      render(
        <FavoriteButton
          itemId="test-123"
          isFavorited={false}
          onFavoriteChange={handleChange}
        />
      );
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleChange).toHaveBeenCalledWith('test-123', true);
    });
  });

  describe('Accessibility', () => {
    it('announces state changes to screen readers', async () => {
      const { rerender } = render(
        <FavoriteButton
          itemId="test-123"
          isFavorited={false}
        />
      );
      
      rerender(
        <FavoriteButton
          itemId="test-123"
          isFavorited={true}
        />
      );
      
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('favorited')
      );
    });
  });
});
```

## Best Practices

1. Usage Guidelines
   - Use consistently across similar content types
   - Maintain immediate feedback on interaction
   - Sync with global favorite state
   - Handle offline state appropriately

2. Content Guidelines
   - Use clear, contextual aria labels
   - Maintain consistent icon usage
   - Provide appropriate loading states
   - Handle error states gracefully

3. Layout Considerations
   - Position consistently within parent components
   - Maintain adequate spacing
   - Consider mobile touch targets
   - Align with other interactive elements

4. Performance
   - Optimize animation performance
   - Debounce rapid toggles
   - Handle state updates efficiently
   - Manage memory for large lists
