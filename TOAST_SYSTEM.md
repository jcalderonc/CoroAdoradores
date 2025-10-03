# Toast Notification System

This document explains how to use the toast notification system in the Coro Adoradores application.

## Overview

The toast system provides elegant, non-intrusive notifications for user feedback. It includes:
- Multiple toast types (success, error, warning, info)
- Automatic positioning and animations
- Auto-dismiss functionality
- Predefined messages for common scenarios
- Easy-to-use service functions

## Architecture

### 1. ToastContext (`src/context/ToastContext.jsx`)
- Manages global toast state
- Provides add/remove toast functions
- Handles auto-dismiss timers
- Uses useReducer for state management

### 2. Toast Component (`src/components/atoms/Toast/Toast.jsx`)
- Individual toast notification component
- Supports different types with appropriate icons and colors
- Smooth entrance/exit animations
- Manual dismiss functionality

### 3. ToastContainer (`src/components/atoms/Toast/ToastContainer.jsx`)
- Container that renders all active toasts
- Fixed positioning (top-right)
- Manages toast lifecycle

### 4. ToastService (`src/services/toastService.js`)
- Predefined messages for common scenarios
- Convenient helper functions
- Centralized toast management

## Usage

### Basic Toast Usage

```jsx
import { useToast } from '../context/ToastContext'

function MyComponent() {
  const { success, error, info, warning } = useToast()
  
  const handleSuccess = () => {
    success('Operation completed successfully!')
  }
  
  const handleError = () => {
    error('Something went wrong!')
  }
  
  const handleInfo = () => {
    info('Here is some information')
  }
  
  const handleWarning = () => {
    warning('Please be careful!')
  }
}
```

### Using ToastService

```jsx
import { useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import toastService from '../services/toastService'

function MyComponent() {
  const toast = useToast()
  
  useEffect(() => {
    // Set up the toast service
    toastService.setToastFunctions(toast)
  }, [toast])
  
  const handleLogin = async () => {
    try {
      // ... login logic
      toastService.loginSuccess('Juan')
    } catch (error) {
      toastService.userNotFound()
    }
  }
}
```

## Toast Types

### Success Toast
- **Color**: Green
- **Icon**: Checkmark
- **Use**: Successful operations, confirmations
- **Duration**: 5 seconds

### Error Toast
- **Color**: Red
- **Icon**: X mark
- **Use**: Errors, failures, validation issues
- **Duration**: 7 seconds

### Warning Toast
- **Color**: Yellow
- **Icon**: Warning triangle
- **Use**: Warnings, cautions, important notices
- **Duration**: 6 seconds

### Info Toast
- **Color**: Blue
- **Icon**: Information circle
- **Use**: General information, tips
- **Duration**: 5 seconds

## Predefined Messages

The ToastService includes predefined messages for common scenarios:

### Authentication
- `loginSuccess(userName)` - Welcome message after login
- `loginError(message)` - Login failure message
- `userNotFound()` - User not found error
- `invalidCredentials()` - Invalid password error
- `logoutSuccess()` - Logout confirmation
- `sessionExpired()` - Session timeout warning

### API Operations
- `apiError(message)` - API request failure
- `networkError()` - Network connection error
- `dataSaved(itemName)` - Data saved successfully
- `dataUpdated(itemName)` - Data updated successfully
- `dataDeleted(itemName)` - Data deleted successfully
- `dataLoadError(itemName)` - Data loading error

### Form Validation
- `requiredField(fieldName)` - Required field warning
- `invalidEmail()` - Invalid email format
- `passwordTooShort()` - Password length warning

### Permissions
- `accessDenied()` - Permission denied error

## Customization

### Custom Duration
```jsx
const { addToast } = useToast()

// Show toast for 10 seconds
addToast('Custom message', 'info', 10000)

// Show toast permanently (until manually dismissed)
addToast('Important message', 'warning', 0)
```

### Manual Dismiss
```jsx
const { addToast, removeToast } = useToast()

const toastId = addToast('This will stay until dismissed', 'info', 0)

// Later, dismiss it manually
removeToast(toastId)
```

## Examples

### Login Form
```jsx
const handleLogin = async (credentials) => {
  try {
    const result = await login(credentials)
    if (result.success) {
      toastService.loginSuccess(credentials.email.split('@')[0])
    } else {
      toastService.loginError(result.message)
    }
  } catch (error) {
    toastService.networkError()
  }
}
```

### Data Operations
```jsx
const handleSave = async (data) => {
  try {
    await saveData(data)
    toastService.dataSaved('Evento')
  } catch (error) {
    toastService.apiError('No se pudo guardar el evento')
  }
}
```

### Form Validation
```jsx
const handleSubmit = (formData) => {
  if (!formData.email) {
    toastService.requiredField('correo electrónico')
    return
  }
  
  if (!isValidEmail(formData.email)) {
    toastService.invalidEmail()
    return
  }
  
  // Continue with form submission
}
```

## Best Practices

1. **Use appropriate toast types** for different scenarios
2. **Keep messages concise** and user-friendly
3. **Use predefined messages** when possible for consistency
4. **Don't overuse toasts** - avoid showing too many at once
5. **Consider timing** - longer duration for important messages
6. **Test on mobile** - ensure toasts are visible on small screens

## Styling

Toasts are styled with Tailwind CSS and include:
- Responsive design
- Smooth animations
- Color-coded types
- Proper spacing and typography
- Mobile-friendly positioning

The system is fully customizable through the component files if you need to modify the appearance.
