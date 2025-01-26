# Section Component

## Overview
The `Section` component is a reusable layout container used in Mosaic to group content into visually distinct blocks. Each section organizes related content, such as exercises, routines, or templates, to create a clean and intuitive layout.

---

## Key Features

1. **Header (Optional):**
   - Displays a **title** and an optional **description** to explain the section’s purpose.

2. **Content Area:**
   - Holds and displays the primary content for the section (e.g., lists, grids, or other containers).

3. **Customizable Styles:**
   - Supports additional styling for margins, padding, and background colors.

---

## Use Cases in Mosaic

### 1. **Routine Builder Page**
   - **Purpose:** Groups exercises by routine block for organization and clarity.
   - **Exercise Groupings:**
     - **Center Core**
     - **Right Leg**
     - **Left Leg**
     - **Right Oblique**
     - **Left Oblique**
     - **Upper Body**
     - **Mini Center Core (Closing Block)**  
   - **Content:** Displays dynamically filtered lists of exercises in the selected block.

### 2. **Saved Routines**
   - **Purpose:** Groups user-created routines into categories for organization and quick access.
   - **Example Section Titles:**
     - "My Routines"
     - "Favorites"
     - "Shared Routines"
   - **Content:** Displays a list of saved routines, each presented as a card.

### 3. **Templates Library**
   - **Purpose:** Groups pre-designed routine templates for browsing and selection.
   - **Content:** Displays templates in a list or grid, allowing users to preview and select routines.

### 4. **Exercise Library**
   - **Purpose:** Organizes exercises by type for browsing and selection in the Routine Builder.
   - **Exercise Tags/Filters:**
     - **Light Resistance**
     - **Heavy Pulling**
     - **Assisted vs. Resistive Movements** (depending on spring settings)  
   - **Content:** Displays a grid of exercises, with relevant tags, instructions, and demo videos.

---

## Props

| **Prop**      | **Type**          | **Default**  | **Description**                                      |
|---------------|-------------------|--------------|------------------------------------------------------|
| `title`       | `string`          | `""`         | Title of the section, displayed at the top.          |
| `description` | `string`          | `null`       | Optional description text displayed below the title. |
| `children`    | `ReactNode`       | `null`       | The content displayed within the section.            |
| `className`   | `string`          | `""`         | Custom CSS classes for additional styling.           |
| `style`       | `CSSProperties`   | `{}`         | Inline styles for fine-grained customization.        |

---

## Example Implementation

### **Routine Builder Section**
```javascript
<Section
  title="Core Exercises"
  description="Exercises targeting your center core muscles."
>
  <ExerciseList exercises={coreExercises} />
</Section>
