# ShareButton Component

The ShareButton extends StandardButton to provide a unified sharing experience across Mosaic. It intelligently handles sharing through the Web Share API when available, with graceful fallbacks to a custom share menu. The component supports sharing exercises, routines, and programs while maintaining consistent behavior across desktop and mobile platforms.

## Interface

```typescript
interface ShareButtonProps extends Omit<StandardButtonProps, 'variant' | 'children'> {
  /** Unique identifier for the shared item */
  itemId: string;
  
  /** Type of content being shared */
  itemType: 'exercise' | 'routine' | 'program';
  
  /** Title for sharing */
  shareTitle: string;
  
  /** Optional description for sharing */
  shareDescription?: string;
  
  /** Custom URL for sharing (defaults to current item URL) */
  shareUrl?: string;
  
  /** Callback when share is completed successfully */
  onShareSuccess?: () => void;
  
  /** Callback when share encounters an error */
  onShareError?: (error: Error) => void;
  
  /** Custom share platforms to include */
  platforms?: SharePlatform[];
  
  /** Whether to show share count */
  showShareCount?: boolean;
}

type SharePlatform = 'whatsapp' | 'email' | 'copy' | 'notes';
```

## Design Implementation

### Typography and Visual Design
```typescript
const shareButtonStyles = cn(
  // Inherit StandardButton base styles
  buttonStyles,
  
  // Share-specific styling
  "relative group",
  
  // Platform-specific colors on hover
  "hover:bg-primary/10",
  
  // Menu positioning
  "inline-flex items-center",
  
  // Share count badge
  showShareCount && "pr-8",
  
  // Active state
  "active:scale-95",
  
  // Disabled state
  "disabled:opacity-50"
);

const shareMenuStyles = cn(
  // Menu positioning and layout
  "absolute top-full mt-2 right-0",
  "bg-white dark:bg-gray-800",
  "rounded-lg shadow-lg",
  "border border-border",
  
  // Animation
  "origin-top-right",
  "transition-all duration-200",
  
  // States
  "invisible opacity-0 scale-95",
  "group-hover:visible group-hover:opacity-100 group-hover:scale-100"
);
```

### Motion Design
```typescript
// Share success animation
const successAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  }
};

// Menu transition
const menuAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15
    }
  }
};
```

## Accessibility Features

1. Keyboard Navigation
   ```typescript
   // Menu keyboard navigation
   const handleKeyboardNav = (e: KeyboardEvent) => {
     switch(e.key) {
       case 'ArrowDown':
         // Focus next platform option
         focusNextPlatform();
         break;
       case 'ArrowUp':
         // Focus previous platform option
         focusPrevPlatform();
         break;
       case 'Escape':
         // Close menu
         closeShareMenu();
         break;
     }
   };
   ```

2. Screen Reader Support
   ```typescript
   // Dynamic ARIA labels
   const getAriaLabel = () => {
     if (isMenuOpen) return `Close share menu for ${shareTitle}`;
     return `Share ${itemType}: ${shareTitle}`;
   };
   ```

3. Touch Optimization
   - Larger touch targets for platform options
   - Clear visual feedback
   - Haptic feedback on share success

## Usage Examples

```typescript
// Basic Implementation
<ShareButton
  itemId="exercise-123"
  itemType="exercise"
  shareTitle="Morning Pilates Routine"
/>

// With Custom Share Options
<ShareButton
  itemId="routine-456"
  itemType="routine"
  shareTitle="Advanced Core Workout"
  shareDescription="A 30-minute advanced core routine"
  platforms={['whatsapp', 'email']}
  showShareCount
  onShareSuccess={() => trackShareEvent('routine-456')}
/>

// Within Exercise Card
<ExerciseCard>
  <ShareButton
    itemId={exercise.id}
    itemType="exercise"
    shareTitle={exercise.name}
    shareDescription={exercise.description}
  />
</ExerciseCard>
```

## Testing

```typescript
describe('ShareButton', () => {
  describe('Rendering', () => {
    it('renders with default platforms', () => {
      render(
        <ShareButton
          itemId="test-123"
          itemType="exercise"
          shareTitle="Test Exercise"
        />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows correct platforms based on props', () => {
      render(
        <ShareButton
          itemId="test-123"
          itemType="exercise"
          shareTitle="Test Exercise"
          platforms={['whatsapp', 'email']}
        />
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByText('WhatsApp')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  describe('Web Share API', () => {
    it('uses Web Share API when available', async () => {
      const mockShare = jest.fn();
      global.navigator.share = mockShare;

      render(
        <ShareButton
          itemId="test-123"
          itemType="exercise"
          shareTitle="Test Exercise"
        />
      );
      
      await userEvent.click(screen.getByRole('button'));
      expect(mockShare).toHaveBeenCalled();
    });

    it('falls back to menu when Web Share API is unavailable', async () => {
      delete global.navigator.share;

      render(
        <ShareButton
          itemId="test-123"
          itemType="exercise"
          shareTitle="Test Exercise"
        />
      );
      
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Share Count', () => {
    it('displays share count when enabled', () => {
      render(
        <ShareButton
          itemId="test-123"
          itemType="exercise"
          shareTitle="Test Exercise"
          showShareCount
        />
      );
      
      expect(screen.getByText(/[0-9]+/)).toBeInTheDocument();
    });
  });
});
```

## Best Practices

1. Usage Guidelines
   - Use consistently across shareable content
   - Implement platform-specific sharing when available
   - Provide appropriate fallbacks
   - Handle offline state gracefully

2. Content Guidelines
   - Create clear, engaging share text
   - Include relevant context in shares
   - Use appropriate platform-specific formatting
   - Maintain brand voice in share content

3. Layout Considerations
   - Position share menu appropriately
   - Consider mobile screen constraints
   - Maintain touch-friendly targets
   - Ensure menu visibility

4. Performance
   - Lazy load platform-specific code
   - Optimize share preview images
   - Cache share counts
   - Handle rate limiting
   - Monitor share analytics
