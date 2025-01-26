# Modal Component

## Overview
The `Modal` component is a reusable popup container used in Mosaic for focused user interactions. It overlays the app with a semi-transparent background and requires users to take action or dismiss the modal before returning to the main interface.

## Use Cases
1. **Create New Routine:**
   - Allows users to select between creating a Routine Template or a Custom Routine.
2. **Confirm Actions:**
   - Prompts users to confirm actions like deleting a routine or resetting a template.
3. **Sharing Routines:**
   - Displays options for sharing a routine via link or within the app.
4. **Additional Details:**
   - Displays more information about an exercise or routine (e.g., tags, descriptions).

## Props
| **Prop**     | **Type**    | **Default**  | **Description**                                 |
|--------------|-------------|--------------|------------------------------------------------|
| `isOpen`     | `boolean`   | `false`      | Controls whether the modal is visible.         |
| `onClose`    | `function`  | `undefined`  | Function to close the modal.                   |
| `title`      | `string`    | `""`         | Title displayed in the modal header.           |
| `children`   | `ReactNode` | `null`       | The content displayed inside the modal.        |
| `footer`     | `ReactNode` | `null`       | Optional footer with action buttons or content.|

## Example Implementation
```javascript
<Modal
  isOpen={true}
  title="Create New Routine"
  onClose={() => setModalOpen(false)}
>
  <Button text="Routine Templates" onClick={handleTemplateSelect} />
  <Button text="Custom Routine" onClick={handleCustomSelect} />
</Modal>
