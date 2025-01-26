# FavoriteButton Component

## Overview
The `FavoriteButton` allows users to mark a routine as a favorite by toggling between "favorited" (filled heart) and "not favorited" (outlined heart). Favoriting a routine also saves it to the user's **"Saved Routines" parent page**, where it will appear under both **Saved** and **Favorites** filters.

---

## Key Features
1. **Favorite Toggle:**
   - Updates the favorite status visually (filled or outlined heart).
   - Adds the routine to the **Favorites** filter.

2. **Save Action:**
   - Saves the routine to the **Saved Routines** parent page automatically.

---

## Props

| **Prop**      | **Type**   | **Default** | **Description**                          |
|---------------|------------|-------------|------------------------------------------|
| `isFavorited` | `boolean`  | `false`     | Whether the routine is currently favorited. |
| `onToggle`    | `function` | `null`      | Function to execute when the heart icon is clicked. |

---

## Example Implementation
```javascript
<FavoriteButton
  isFavorited={routine.isFavorited}
  onToggle={() => handleFavoriteToggle(routine.id)}
/>
