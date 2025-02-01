# Container Components - iOS & Mobile Requirements

## Card Container
### iOS-Specific Requirements
- Maintain minimum touch target size of 44x44px for any interactive elements
- Support haptic feedback for interactive elements
- Implement iOS-standard gesture support (swipe actions if applicable)
- Use system-standard corner radius (typically 8px or 16px)

### Focus Management
- Ensure card contents are properly tabbable
- Maintain focus containment within card when modal/overlay content is present
- Support VoiceOver navigation through card content

## Accordion Container
### iOS-Specific Requirements
- Implement iOS-standard animation timing (0.3s for expansion/collapse)
- Support spring animations for natural feel
- Ensure chevron rotation animations match iOS standards
- Maintain minimum 44px height for accordion headers

### Focus Management
- Trap focus within expanded accordion section
- Manage focus when multiple accordions are present
- Ensure proper keyboard navigation between headers and content

## Selection Container
### iOS-Specific Requirements
- Use native iOS selection indicators
- Support iOS-standard selection gestures
- Implement haptic feedback on selection
- Match iOS momentum scrolling behavior

### Focus Management
- Clear focus indicators for selected items
- Support group selection paradigms
- Handle focus restoration after selection changes

## Modal Container
### iOS-Specific Requirements
- Support safe area insets
- Handle keyboard appearance/disappearance
- Match iOS modal presentation animations
- Support gesture-based dismissal
- Handle orientation changes properly

### Focus Management
- Trap focus within modal
- Return focus to trigger element on close
- Handle nested modal scenarios
- Support proper z-index stacking

## Share Modal Container
### iOS-Specific Requirements
- Integrate with iOS share sheet when possible
- Match iOS share modal appearance
- Support native sharing options
- Handle deep linking appropriately

### Focus Management
- Maintain focus within share options
- Handle focus return after sharing action
- Support keyboard navigation through share targets

## Global Considerations for All Containers
### Performance
- Implement view recycling for long lists
- Lazy load content when appropriate
- Optimize animations for 60fps
- Minimize layout thrashing

### Gesture Handling
- Support standard iOS gestures
- Handle gesture conflicts between nested containers
- Implement proper touch cancelation
- Support multi-touch interactions where appropriate

### Accessibility
- VoiceOver support for all interactive elements
- Clear role and state announcements
- Support dynamic type
- Maintain proper heading hierarchy

### Nested Container Management
1. Focus Hierarchy:
   - Establish clear focus containment boundaries
   - Implement focus trapping at appropriate levels
   - Handle focus restoration between container levels

2. Gesture Coordination:
   - Define gesture priority for nested containers
   - Implement gesture delegation system
   - Handle conflicting gesture scenarios

3. State Management:
   - Maintain clear state hierarchy
   - Handle state propagation between containers
   - Manage shared state effectively

4. Z-Index Management:
   - Establish clear stacking context rules
   - Handle modal/overlay stacking appropriately
   - Maintain proper depth hierarchy
