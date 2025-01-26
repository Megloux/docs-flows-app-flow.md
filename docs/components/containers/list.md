# List Component

## Overview
The `List` component is a reusable container for displaying multiple items (e.g., Cards) in a vertical layout. It provides a simple, organized way to display saved routines or exercises.

## Key Features
- Flexible list layout for any number of items.
- Dynamically adjusts spacing and alignment.

## Props
| **Prop**       | **Type**      | **Default** | **Description**                         |
|----------------|---------------|-------------|-----------------------------------------|
| `gap`          | `string`      | `"16px"`    | Spacing between list items.             |
| `children`     | `ReactNode`   | `null`      | The items to display in the list.       |

## Example
```javascript
<List gap="16px">
  {routines.map((routine) => (
    <Card key={routine.id} title={routine.name} />
  ))}
</List>
