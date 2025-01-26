Notes for Developers
Ensure the component can handle dynamic changes to isLoading and onSubmit.
Validation should be implemented both on the frontend (required name) and the backend for security.

# ManualEntryForm Component

## Overview
The `manual-entry-form` component allows users to manually input exercises into the Routine Builder. It provides flexibility for users who prefer typing in their own exercises rather than selecting from the Exercise Library.

---

## Form Structure
1. **Fields:**
   - **Exercise Name (required):**
     - Single-line text input field.
     - Validates that the field is not empty.
   - **Description (optional):**
     - Multi-line textarea input for additional details or notes.

2. **Submit Button:**
   - Triggers the form submission to add the custom exercise to the Routine Builder.
   - Includes a loading state while submission is processing.

---

## Props

| **Prop**        | **Type**   | **Default** | **Description**                        |
|-----------------|------------|-------------|----------------------------------------|
| `onSubmit`      | `function` | `null`      | Callback triggered on form submission. |
| `isLoading`     | `boolean`  | `false`     | Indicates if the form is submitting.   |

---

## Expected Behavior
1. **Validation:**
   - **Exercise Name** must be filled in.
   - Optional fields are not validated.

2. **Submission Flow:**
   - The form submission calls the `onSubmit` prop, passing an object with the entered data:
     ```javascript
     {
       name: "Exercise Name",
       description: "Optional description text",
     }
     ```

3. **Loading State:**
   - Disables the form and shows a loading spinner on the button while submitting.

---

## Example Implementation
```javascript
<ManualEntryForm
  onSubmit={(exercise) => console.log("Submitted exercise:", exercise)}
  isLoading={false}
/>
