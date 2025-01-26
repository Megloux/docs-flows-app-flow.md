x# FavoriteButton Component

## Overview
The `FavoriteButton` allows users to mark a routine as a favorite by toggling between two states: **Favorited** (filled heart) and **Not Favorited** (outlined heart). This button also saves the routine to the user's **"Saved Routines" parent page** and categorizes it under both **Saved** and **Favorites** filters.

---

## Key Features
1. **Favorite Toggle:**
   - Updates the favorite status visually using a heart icon.
   - Filled heart = Favorited, Outlined heart = Not Favorited.

2. **Save Action:**
   - Automatically saves the routine to the **Saved Routines** parent page.

3. **"Saved!" Modal:**
   - Triggers a confirmation modal displaying a "Saved!" message.

---

## Props

| **Prop**      | **Type**   | **Default** | **Description**                          |
|---------------|------------|-------------|------------------------------------------|
| `isFavorited` | `boolean`  | `false`     | Whether the routine is currently favorited. |
| `onToggle`    | `function` | `null`      | Function to execute when the button is toggled. |

---

## Example Implementation
```javascript
<FavoriteButton
  isFavorited={routine.isFavorited}
  onToggle={() => handleFavoriteToggle(routine.id)}
/>
