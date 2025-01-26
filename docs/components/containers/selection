# SelectionContainer

## Overview
The `SelectionContainer` is a reusable UI wrapper that combines **filters** and a **content area**. It allows users to toggle between categories (e.g., routines, favorites, shared routines) and view dynamically updated content, such as lists or grids.

---

## Key Features

1. **Filter Options**
   - Displayed at the top of the container as clickable buttons or tabs.
   - Filters dynamically update the content displayed below.
   - Example filters include:
     - **Routines**
     - **Favorites**
     - **Shared Routines**
     - **Routine Blocks** (e.g., Core, Legs, Upper Body).

2. **Content Area**
   - Displays filtered content based on the selected filter.
   - Can support various layouts, such as:
     - **Lists** (e.g., exercise or routine lists).
     - **Grids** (e.g., tiled layouts for exercises).

3. **Action Buttons**
   - **Manual Entry Button:**
     - Appears in the Routine Builder for users to add custom exercises.
   - **Send Button:**
     - Appears when sharing routines with others (e.g., via link or app).

---

## Use Cases

1. **Routine Builder**
   - Users filter exercises by routine block (e.g., Core, Legs).
   - Dynamically updated content allows users to select exercises.
   - Users can add custom exercises using the "Manual Entry" button.

2. **Saved Routines**
   - Filters like "Favorites" or "Shared Routines" help users organize and view their routines.
   - Users can share routines via the "Send" button.

3. **Exercise Library**
   - Users filter exercises by type (e.g., Light Resistance, Heavy Pulling).
   - Dynamically displays filtered exercises to add to routines.

---

## Example Implementation

### Dynamic Filter and Content Area
```javascript
<SelectionContainer
  filters={["Routines", "Favorites", "Shared Routines"]}
  onFilterSelect={handleFilterChange}
>
  {filteredContent.map(item => (
    <Card key={item.id} title={item.title} />
  ))}
</SelectionContainer>
