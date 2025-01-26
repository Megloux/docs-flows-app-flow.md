# Card Component

## Overview
The `Card` component is a reusable layout container for displaying summarized content, such as exercises, routines, or templates. Each card includes a title, optional description, and action buttons.

---

## Key Features

1. **Content Area:**
   - Displays the primary information, such as:
     - **Title**: Exercise name, routine title, or template name.
     - **Optional Description**: Short text providing additional details.

2. **Visuals:**
   - Supports an optional thumbnail image or icon.

3. **Actions:**
   - Includes action buttons like:
     - **Favorite**: Adds an item to favorites.
     - **Share**: Shares the routine with others.
     - **Edit/Delete**: Modifies or removes the item.

4. **Customizable Styles:**
   - Flexible styling options for padding, borders, and content alignment.

---

## Use Cases in Mosaic

1. **Exercise Library:**
   - Displays individual exercises with:
     - Name
     - Tags (e.g., "Light Resistance")
     - Action buttons (e.g., "Favorite").
   
2. **Saved Routines:**
   - Displays user-created routines with:
     - Routine name.
     - Optional description (e.g., "Strength Training for Beginners").
     - Action buttons for sharing or editing.

3. **Templates Library:**
   - Displays pre-designed templates for browsing with:
     - Template name.
     - Preview thumbnail.
     - Action buttons (e.g., "Duplicate").

---

## Props

| **Prop**      | **Type**          | **Default**  | **Description**                                      |
|---------------|-------------------|--------------|------------------------------------------------------|
| `title`       | `string`          | `""`         | Title of the card, displayed prominently.            |
| `description` | `string`          | `null`       | Optional description text for the card.              |
| `thumbnail`   | `string` (URL)    | `null`       | Optional image or icon displayed at the top.         |
| `actions`     | `ReactNode`       | `null`       | Action buttons, such as "Favorite" or "Edit."        |
| `className`   | `string`          | `""`         | Custom CSS classes for additional styling.           |
| `style`       | `CSSProperties`   | `{}`         | Inline styles for fine-grained customization.        |

---

## Example Implementation

### **Exercise Card**
```javascript
<Card
  title="Core Plank"
  description="Light resistance, targeting the core."
  thumbnail="core-plank.jpg"
  actions={
    <div>
      <Button text="Favorite" onClick={handleFavorite} />
    </div>
  }
/>
