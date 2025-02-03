# BaseCard Component

## Purpose
Provides a foundational card structure with consistent styling, interaction handling, and iOS compliance. Used as a base container for content display throughout Mosaic 2.

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | React.ReactNode | Yes | - | Content displayed inside the card |
| className | string | No | '' | Custom styling classes |
| interactive | boolean | No | false | Enables hover, click, and focus handling |

## Interface
```typescript
interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content rendered inside the card (Required) */
  children: React.ReactNode;
  
  /** Makes card interactive with hover, focus, and click handling */
  interactive?: boolean;
  
  /** Custom styling classes */
  className?: string;
}
```

## Core Features
- Consistent layout and styling
- iOS-optimized touch targets
- Accessible interaction patterns
- Performance-optimized rendering

## Usage

### Basic Container
```tsx
<BaseCard>
  <h2>Card Title</h2>
  <p>Card content</p>
</BaseCard>
```

### Interactive Card
```tsx
<BaseCard 
  interactive 
  onClick={() => handleCardClick()}
>
  <h2>Interactive Card</h2>
  <p>Click or tap me</p>
</BaseCard>
```

## Implementation
```tsx
const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className,
  interactive = false,
  ...props
}) => {
  const handleInteraction = useCallback(() => {
    // Provide haptic feedback on iOS devices
    if (interactive && window?.navigator?.vibrate) {
      window.navigator.vibrate(10); // Light tap feedback
    }
  }, [interactive]);

  return (
    <div
      className={cn(
        // Base styles
        'rounded-lg border border-border bg-card p-4',
        // Interactive states
        interactive && [
          'cursor-pointer',
          'hover:bg-accent/5',
          'active:bg-accent/10',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-ring'
        ],
        // iOS optimizations
        'touch-none min-h-[44px]',
        // Safe areas
        'safe-area-inset',
        // Custom styles
        className
      )}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onTouchStart={handleInteraction}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleInteraction();
          props.onClick?.(e as any);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

BaseCard.displayName = 'BaseCard';
```

## iOS Requirements
- Touch targets: 44x44px minimum (enforced via min-h-[44px])
- Safe area handling through safe-area-inset class
- Smooth touch interaction via touch-none
- Haptic feedback on interactive elements using navigator.vibrate
- Proper touch event handling and feedback

## Accessibility
- Automatic role="button" when interactive
- Keyboard navigation (Enter/Space) for interactive cards
- Focus management with visible states
- Screen reader support through proper ARIA attributes
- Focus ring visibility in keyboard navigation

## Testing
```typescript
describe('BaseCard', () => {
  it('renders content correctly', () => {
    render(<BaseCard>Test Content</BaseCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('maintains iOS compliance', () => {
    const { container } = render(<BaseCard>Test</BaseCard>);
    const element = container.firstChild;
    expect(element).toHaveClass('min-h-[44px]', 'touch-none');
  });

  it('handles interactive mode', () => {
    const onClick = jest.fn();
    render(
      <BaseCard interactive onClick={onClick}>
        Test
      </BaseCard>
    );
    const card = screen.getByRole('button');
    userEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  it('manages focus visibility correctly', () => {
    render(<BaseCard interactive>Focus Test</BaseCard>);
    const card = screen.getByRole('button');
    card.focus();
    expect(card).toHaveClass('focus-visible:ring-2');
    expect(card).toHaveClass('focus-visible:ring-ring');
  });

  it('handles keyboard interaction in interactive mode', () => {
    const onClick = jest.fn();
    render(
      <BaseCard interactive onClick={onClick}>
        Test
      </BaseCard>
    );
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalled();
    
    onClick.mockClear();
    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalled();
  });

  it('provides haptic feedback on touch', () => {
    const vibrateMock = jest.fn();
    Object.defineProperty(window.navigator, 'vibrate', {
      value: vibrateMock,
      writable: true
    });

    render(<BaseCard interactive>Test</BaseCard>);
    const card = screen.getByRole('button');
    fireEvent.touchStart(card);
    
    expect(vibrateMock).toHaveBeenCalledWith(10);
  });
});
```

## Performance
- Component is memoized when children are complex
- Event handlers are properly bound using useCallback
- Layout shifts prevented through consistent sizing
- Touch events optimized for mobile
- Minimal re-renders through proper prop usage

## Styling
```tsx
// Default styles applied through className
const baseStyles = 'rounded-lg border border-border bg-card p-4';
const interactiveStyles = [
  'cursor-pointer',
  'hover:bg-accent/5',
  'active:bg-accent/10',
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-ring'
];
const iosStyles = 'touch-none min-h-[44px] safe-area-inset';
```

## Customization
```tsx
// Example of extending BaseCard
const CustomCard = ({ title, content, ...props }) => (
  <BaseCard {...props}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-2">{content}</p>
  </BaseCard>
);
```

## Related Components
- Card.Header - Top section styling
- Card.Content - Content area styling
- Card.Footer - Bottom section styling

## Implementation Requirements
1. Maintain iOS compliance through proper class usage
2. Ensure accessibility is properly implemented
3. Test all interaction patterns including haptic feedback
4. Preserve performance optimizations
5. Follow styling conventions
