# Header Menu System

This document explains how the dynamic header menu system works in the Coro Adoradores application.

## Overview

The header menu automatically shows/hides menu items based on the user's authentication status. This provides a clean, contextual navigation experience.

## Menu Configuration

Menu items are configured in `src/components/organisms/Header/Data.js` with the following properties:

### Properties

- **id**: Unique identifier for the menu item
- **href**: Link destination (currently using hash links)
- **label**: Display text for the menu item
- **requireAuth**: `true` if the item requires authentication to be visible
- **hideWhenAuthenticated**: `true` if the item should be hidden when user is logged in

### Current Menu Items

| Item | Label | Require Auth | Hide When Authenticated | Description |
|------|-------|--------------|------------------------|-------------|
| home | Home | ❌ | ❌ | Always visible |
| scheduler | Calendario | ✅ | ❌ | Only for logged-in users |
| profile | Mi Perfil | ✅ | ❌ | Only for logged-in users |
| login | Login | ❌ | ✅ | Only for non-logged-in users |
| register | Registro | ❌ | ✅ | Only for non-logged-in users |

## Menu States

### When User is NOT Authenticated
Shows:
- ✅ Home
- ❌ Calendario (hidden - requires auth)
- ❌ Mi Perfil (hidden - requires auth)
- ✅ Login
- ✅ Registro

### When User IS Authenticated
Shows:
- ✅ Home
- ✅ Calendario
- ✅ Mi Perfil
- ❌ Login (hidden - not needed)
- ❌ Registro (hidden - not needed)

## Implementation Details

### Header Component Logic

```jsx
const getFilteredMenuItems = () => {
  return headerData.filter(item => {
    if (user) {
      // User is authenticated
      return (!item.requireAuth || item.requireAuth) && !item.hideWhenAuthenticated;
    } else {
      // User is not authenticated
      return !item.requireAuth;
    }
  });
};
```

### Filtering Logic

1. **If user is authenticated (`user` exists):**
   - Show items that don't require auth OR require auth
   - Hide items marked with `hideWhenAuthenticated: true`

2. **If user is NOT authenticated (`user` is null):**
   - Show only items that don't require auth (`requireAuth: false`)

## Adding New Menu Items

To add a new menu item:

1. **Add to `Data.js`:**
```jsx
{
  id: "new-item",
  href: "#new-item",
  label: "New Item",
  requireAuth: true, // or false
  hideWhenAuthenticated: false, // or true
}
```

2. **Add route handling in `App.jsx`:**
```jsx
{selectedPage === "New Item" && <NewItemComponent />}
```

3. **Create the component if needed**

## Examples

### Public Menu Item (always visible)
```jsx
{
  id: "about",
  href: "#about",
  label: "Acerca de",
  requireAuth: false,
  hideWhenAuthenticated: false,
}
```

### Authenticated Only Menu Item
```jsx
{
  id: "settings",
  href: "#settings",
  label: "Configuración",
  requireAuth: true,
  hideWhenAuthenticated: false,
}
```

### Login/Register Menu Item (only when not logged in)
```jsx
{
  id: "login",
  href: "#login",
  label: "Login",
  requireAuth: false,
  hideWhenAuthenticated: true,
}
```

## Benefits

✅ **Contextual Navigation** - Users only see relevant menu items  
✅ **Clean UI** - No unnecessary options cluttering the interface  
✅ **Security** - Protected routes are hidden from non-authenticated users  
✅ **User Experience** - Intuitive navigation based on user state  
✅ **Maintainable** - Easy to add/remove menu items  
✅ **Consistent** - Same logic applies to desktop and mobile menus  

## Future Enhancements

- Role-based menu items (admin, user, moderator)
- Dynamic menu items based on user permissions
- Menu item icons
- Nested menu support
- Menu item badges/notifications
