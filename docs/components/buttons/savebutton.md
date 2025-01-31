# SaveButton Component

The SaveButton extends StandardButton to provide a consistent saving mechanism across Mosaic. It handles both the action of saving items and displaying their saved state, with appropriate loading states and error handling. The component integrates with our offline storage system to maintain state persistence.

## Interface

```typescript
interface SaveButtonProps extends Omit<StandardButtonProps, 'variant' | 'children'> {
  /** Unique identifier for the saveable item */
  itemId: string;
  
  /** Current saved status */
  isSaved: boolean;
  
  /** Optional callback when save status changes */
  onSaveChange?: (itemId: string, newStatus: boolean) => void;
  
  /** Custom aria label for accessibility */
  ariaLabel?: string;
  
  /** Whether save operation is currently in progress */
  isSaving?: boolean;
  
  /** Indicates if there was an error in the last save attempt */
  hasError?: boolean;
  
  /** Optional error message to display */
  errorMessage?: string;
}
```

## Design Implementation

### Typography and Visual Design
```typescript
const saveButtonStyles = cn(
  // Inherit StandardButton base styles
  buttonStyles,
  
  // Specific styling for saved state
  "relative",
  isSaved && [
    "text-primary",
    "hover:text-primary/90",
    "dark:text-primary-400"
  ],
  
  // Error state styling
  hasError && [
    "text-destructive",
    "hover:text-destructive/90",
    "dark:text-destructive-400"
  ],
  
  // Loading state
  isSaving && "cursor-wait"
);

const iconStyles = cn(
  "transition-all duration-200",
  isSaved ? "scale-100" : "scale-90",
  isSaving && "animate-pulse"
);
```

### Motion Design
```typescript
const saveAnimation = {
  // Success animation
  success: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  },
  
  // Error animation
  error: {
    x: [0, -4, 4, -4, 4, 0],
    transition: { duration: 0.4 }
  }
};
```

## Accessibility Features

1. Keyboard Navigation
   - Standard keyboard interaction support
   - Error message focus management
   - Loading state announcements

2. Screen Reader Support
   ```typescript
   const getAriaLabel = () => {
     if (isSaving) return `Saving ${itemType}...`;
     if (hasError) return `Error saving ${itemType}. ${errorMessage}`;
     return isSaved ? `Remove ${itemType} from saved items` : `Save ${itemType}`;
   };
   ```

3. Touch Optimization
   - Clear touch feedback states
   - Error state indication
   - Loading state visual feedback

## Usage Examples

```typescript
// Basic Implementation
<SaveButton
  itemId="exercise-123"
  isSaved={isSaved}
  onSaveChange={handleSaveChange}
/>

// With Loading and Error States
<SaveButton
  itemId="routine-456"
  isSaved={isSaved}
  isSaving={isProcessing}
  hasError={saveError !== null}
  errorMessage={saveError?.message}
  onSaveChange={handleSaveChange}
/>

// Within Exercise Card
<ExerciseCard>
  <SaveButton
    itemId={exercise.id}
    isSaved={exercise.isSaved}
    onSaveChange={updateExerciseSaveStatus}
    ariaLabel={`Save ${exercise.name} exercise`}
  />
</ExerciseCard>
```

## Testing

```typescript
describe('SaveButton', () => {
  describe('Rendering', () => {
    it('renders in different states correctly', () => {
      // Initial state
      const { rerender } = render(
        <SaveButton itemId="test-123" isSaved={false} />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
      
      // Saved state
      rerender(<SaveButton itemId="test-123" isSaved={true} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
      
      // Loading state
      rerender(
        <SaveButton itemId="test-123" isSaved={false} isSaving={true} />
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Interaction', () => {
    it('handles save action with loading state', async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <SaveButton
          itemId="test-123"
          isSaved={false}
          onSaveChange={handleChange}
        />
      );
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleChange).toHaveBeenCalledWith('test-123', true);
      
      // Test loading state
      rerender(
        <SaveButton
          itemId="test-123"
          isSaved={false}
          isSaving={true}
          onSaveChange={handleChange}
        />
      );
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleChange).not.toHaveBeenCalledTimes(2);
    });

    it('displays error state appropriately', async () => {
      render(
        <SaveButton
          itemId="test-123"
          isSaved={false}
          hasError={true}
          errorMessage="Failed to save"
        />
      );
      
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to save');
    });
  });
});
```

## Best Practices

1. Usage Guidelines
   - Implement consistent save behavior across similar content
   - Always show clear loading states during save operations
   - Handle offline scenarios gracefully
   - Provide clear error feedback
   - Maintain state consistency with backend

2. Content Guidelines
   - Use clear, action-oriented labels
   - Provide meaningful error messages
   - Indicate offline availability
   - Show sync status when relevant

3. Layout Considerations
   - Position consistently within containers
   - Allow space for error messages
   - Consider mobile view constraints
   - Maintain alignment with other actions

4. Performance
   - Debounce save operations
   - Cache save states locally
   - Handle background syncing
   - Manage error retry logic
   - Optimize offline storage
