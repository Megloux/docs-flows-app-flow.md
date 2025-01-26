# Grid Component

## Overview
The `Grid` component is a reusable container for displaying multiple items (e.g., Cards) in a grid layout. It provides a consistent and visually appealing way to organize exercises, routines, or templates.

## Key Features
- Flexible layout options (e.g., column count, spacing).
- Dynamically adjusts based on screen size.
- Supports child components like `Card`.

## Props
| **Prop**       | **Type**      | **Default** | **Description**                         |
|----------------|---------------|-------------|-----------------------------------------|
| `columns`      | `number`      | `3`         | Number of columns in the grid layout.   |
| `gap`          | `string`      | `"16px"`    | Spacing between grid items.             |
| `children`     | `ReactNode`   | `null`      | The items to display in the grid.       |

## Example
```javascript
<Grid columns={3} gap="16px">
  {exercises.map((exercise) => (
    <Card key={exercise.id} title={exercise.name} />
  ))}
</Grid>
