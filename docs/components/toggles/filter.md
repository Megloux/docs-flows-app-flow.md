### Documentation for Filter Component

**Component:** Filter

**Overview:**  
The **Filter** component is a reusable UI element for selecting and toggling multiple filter options, such as exercise categories. It dynamically updates the displayed content based on selected filters and is designed to be used across various pages and journeys within the Mosaic app.

---

### **Structure:**

1. **Search Input**  
   - Allows users to search through content (e.g., exercises).
   - Includes a search icon for visual cueing.

2. **Filter Bar**  
   - Displays filter options (e.g., exercise categories) in button format.
   - Supports multiple selections using an array of selected filters.
   - Options are scrollable horizontally to ensure visibility.

3. **Content View Toggle**  
   - Users can switch between **Grid** and **List** views.
   - Toggle state is persistent through localStorage.

---

### **Key Props:**

| Prop Name         | Type            | Description                                   |
|-------------------|-----------------|-----------------------------------------------|
| `filters`         | `string[]`      | Array of filter categories or options.        |
| `onFilterChange`  | `function`      | Callback to handle filter changes.            |
| `viewMode`        | `'grid' | 'list'` | Toggles between grid or list view modes.      |
| `onViewToggle`    | `function`      | Callback to handle view mode changes.         |
| `searchQuery`     | `string`        | Current search query input.                   |
| `onSearchChange`  | `function`      | Callback to handle changes in the search bar. |

---

### **Behavior:**

1. **Filter Selection:**  
   - Clicking a filter button adds or removes it from the selected filters.
   - The displayed content dynamically updates to match the applied filters.

2. **Search:**  
   - The input allows users to type queries and filters results in real-time.
   - The query is matched against names and metadata properties.

3. **View Toggle:**  
   - Allows users to switch between grid and list displays.
   - The selected mode is saved in localStorage for persistence.

---

### **Events/Tracking:**  
- **trackSearch:** Tracks search queries and interaction analytics.
- **trackFilterUsage:** Logs filter selection and usage for analytics.
- **trackExerciseView:** Logs when a user selects an exercise.

---

### **Location in Documentation:**  
**Path:**  
`docs/components/navigation/Filter.md`

**Commit Message:**  
`Add reusable Filter component documentation`

This will ensure the documentation fits your setup and provides clarity for the developers.
