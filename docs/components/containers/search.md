# SearchInput Component

## Overview
The `SearchInput` allows users to type in keywords or text to filter or search dynamically. It updates results in real time and can be reused in multiple areas of Mosaic.

---

## Key Features
1. **Dynamic Updates:**
   - Updates search results dynamically as the user types.

2. **Reusable Design:**
   - Can be implemented in different contexts (e.g., ShareModal, Exercise Library, Routine Builder).

3. **Custom Placeholder:**
   - Displays placeholder text to guide the user ("Search").

---

## Props

| **Prop**       | **Type**   | **Default**    | **Description**                     |
|----------------|------------|----------------|-------------------------------------|
| `value`        | `string`   | `''`           | Current value of the search input.  |
| `onChange`     | `function` | `null`         | Function to handle input changes.   |
| `placeholder`  | `string`   | `'Search...'`  | Placeholder text for the input.     |

---

## Example Implementation
```javascript
<SearchInput
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search exercises"
/>
