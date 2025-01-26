# ShareModal Component

## Overview
The `ShareModal` facilitates sharing routines within Mosaic. It allows users to select a recipient and share routines via **phone number**, **name**, or **social media handle** (as stored in profiles). The shared routine is added to the recipient’s **"Saved Routines" parent page**.

---

## Key Features
1. **Recipient Search:**
   - Users can search for recipients by:
     - Phone number.
     - Name.
     - Social media handle.

2. **Recipient Selection:**
   - Displays dynamic search results as the user types.
   - Users can select one recipient from the list.

3. **Confirmation Modal:**
   - After sharing, a **"Shared!" modal** confirms the routine was successfully sent.

---

## Props

| **Prop**          | **Type**   | **Default** | **Description**                            |
|-------------------|------------|-------------|--------------------------------------------|
| `isOpen`          | `boolean`  | `false`     | Controls whether the modal is visible.     |
| `onClose`         | `function` | `null`      | Function to close the modal.               |
| `onShare`         | `function` | `null`      | Function to execute the sharing logic.     |
| `searchResults`   | `array`    | `[]`        | List of recipients matching the search.    |
| `onSearchChange`  | `function` | `null`      | Updates the search input value.            |

---

## Example Implementation
```javascript
<ShareModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  onShare={handleShareRoutine}
  searchResults={searchResults}
  onSearchChange={(value) => handleSearchChange(value)}
/>



Sharing Flow (High-Level)
Search Input:
User types a phone number, name, or social media handle into the search bar.
Dynamic Results:
A list of matching recipients is displayed dynamically as the user types.
Select Recipient:
User selects a recipient from the list.
Confirm Sharing:
User clicks the Share button to send the routine.
A "Shared!" modal confirms the success of the action.
Notes
The ShareModal interacts with user profiles to fetch recipient information.
Ensure seamless integration with the "Saved Routines" parent page for shared routines.
