# ShareButton Component

The ShareButton enables instructors to share routines with other Mosaic users through a searchable dialog interface. It provides immediate feedback and handles loading and error states gracefully.

## Interface

```typescript
interface ShareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ID of the routine being shared */
  routineId: string;
  
  /** Called when sharing completes successfully */
  onShareComplete?: () => void;
  
  /** Optional style overrides */
  className?: string;
}
```

## Core Features

The component provides:
- User search by name, handle, or phone number
- Clear loading and error states
- Toast notifications for feedback
- Full keyboard navigation support
- Mobile-optimized interface

## Implementation

```typescript
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Share2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const ShareButton: React.FC<ShareButtonProps> = ({
  routineId,
  onShareComplete,
  className,
  ...props
}) => {
  // State management
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSharing, setIsSharing] = React.useState(false);
  const { toast } = useToast();

  // Handle share action
  const handleShare = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    try {
      // Your sharing implementation here
      await shareRoutine(routineId, searchQuery);
      
      toast({
        title: "Routine shared",
        description: "The routine has been shared successfully.",
      });

      onShareComplete?.();
    } catch (error) {
      toast({
        title: "Error sharing routine",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative group p-2",
            "hover:bg-accent hover:text-accent-foreground",
            className
          )}
          aria-label="Share routine"
          {...props}
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Share Routine</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Search by name, handle, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="col-span-3"
            disabled={isSharing}
            aria-label="Search users"
          />
          
          <Button 
            onClick={handleShare} 
            className="w-full"
            disabled={isSharing}
          >
            {isSharing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sharing...
              </>
            ) : (
              'Share Routine'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

## Usage Examples

```tsx
// Basic usage
<ShareButton routineId="routine-123" />

// With success callback
<ShareButton 
  routineId="routine-123"
  onShareComplete={() => {
    // Handle successful share
    refetchRoutines();
  }}
/>
```

## Testing

```typescript
describe("ShareButton", () => {
  const mockShareRoutine = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct accessibility attributes", () => {
    render(<ShareButton routineId="test-123" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label", 
      "Share routine"
    );
  });

  it("displays and handles search input", async () => {
    render(<ShareButton routineId="test-123" />);
    
    // Open dialog
    await userEvent.click(screen.getByRole("button"));
    
    // Find and interact with search
    const search = screen.getByRole("textbox");
    await userEvent.type(search, "John");
    
    expect(search).toHaveValue("John");
  });

  it("handles successful share", async () => {
    const onShareComplete = jest.fn();
    mockShareRoutine.mockResolvedValueOnce(undefined);

    render(
      <ShareButton 
        routineId="test-123" 
        onShareComplete={onShareComplete}
      />
    );
    
    // Complete share flow
    await userEvent.click(screen.getByRole("button"));
    await userEvent.type(screen.getByRole("textbox"), "John");
    await userEvent.click(screen.getByText("Share Routine"));
    
    // Verify results
    expect(mockShareRoutine).toHaveBeenCalledWith("test-123", "John");
    expect(onShareComplete).toHaveBeenCalled();
  });

  it("handles errors appropriately", async () => {
    mockShareRoutine.mockRejectedValueOnce(new Error("Share failed"));

    render(<ShareButton routineId="test-123" />);
    
    // Attempt share
    await userEvent.click(screen.getByRole("button"));
    await userEvent.type(screen.getByRole("textbox"), "John");
    await userEvent.click(screen.getByText("Share Routine"));
    
    // Verify error handling
    expect(screen.getByText("Share failed")).toBeInTheDocument();
  });

  it("manages loading state correctly", async () => {
    mockShareRoutine.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<ShareButton routineId="test-123" />);
    
    // Start share process
    await userEvent.click(screen.getByRole("button"));
    await userEvent.type(screen.getByRole("textbox"), "John");
    await userEvent.click(screen.getByText("Share Routine"));
    
    // Verify loading state
    expect(screen.getByText("Sharing...")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
```

## Best Practices

1. Implementation Guidelines:
   - Always show loading states during share operations
   - Validate search input before sharing
   - Provide clear feedback for success and errors
   - Handle offline states appropriately
   - Maintain keyboard navigation support

2. Accessibility Considerations:
   - Use proper ARIA labels
   - Maintain focus management
   - Announce status changes
   - Support screen readers
   - Ensure keyboard navigation
