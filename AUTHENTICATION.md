# Authentication System

This document explains how the authentication system works in the Coro Adoradores application.

## Overview

The authentication system is built using React Context API and provides:
- Global authentication state management
- Automatic token storage in localStorage
- API service with automatic authentication headers
- User profile management
- Clean logout functionality

## Architecture

### 1. AuthContext (`src/context/AuthContext.jsx`)
- Manages global authentication state
- Provides login/logout functions
- Handles token storage and retrieval
- Uses useReducer for state management

### 2. API Service (`src/services/api.js`)
- Centralized API service with authentication interceptor
- Automatically adds Bearer token to requests
- Provides methods for GET, POST, PUT, DELETE operations
- Singleton pattern for easy access throughout the app

### 3. useApi Hook (`src/hooks/useApi.js`)
- Custom hook for making API calls with loading states
- Provides convenient methods for common operations
- Handles error states automatically

## Usage

### Basic Authentication

```jsx
import { useAuth } from '../context/AuthContext'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  
  // Access user data
  console.log(user.firstName, user.email)
  
  // Logout
  const handleLogout = () => {
    logout()
  }
}
```

### Making Authenticated API Calls

```jsx
import useApi from '../hooks/useApi'

function MyComponent() {
  const { get, post, loading, error } = useApi()
  
  const fetchData = async () => {
    try {
      // This will automatically include the auth token
      const data = await get('/some-endpoint')
      console.log(data)
    } catch (err) {
      console.error('API Error:', err)
    }
  }
  
  const createData = async (newData) => {
    try {
      const result = await post('/create-endpoint', newData)
      console.log('Created:', result)
    } catch (err) {
      console.error('Creation failed:', err)
    }
  }
}
```

### Direct API Service Usage

```jsx
import apiService from '../services/api'

// Make authenticated requests directly
const data = await apiService.get('/user/profile')
const result = await apiService.post('/create-item', { name: 'Test' })
```

## API Endpoints

### Authentication
- **POST** `/asAuth` - Login endpoint
  - Body: `{ email: string, password: string }`
  - Returns: `{ success: boolean, message: string, data: { user, token, loginTime, expiresIn } }`

### Example Response
```json
{
  "success": true,
  "message": "Welcome Juan! Authentication successful",
  "data": {
    "user": {
      "id": "68625c422e0879e5122f37d2",
      "email": "juan.prueba@afinartestudio.com",
      "firstName": "Juan",
      "lastName": "Calderon",
      "role": "user",
      "createdAt": "2025-06-30T09:43:30.432Z"
    },
    "token": "eyJ1c2VySWQiOiI2ODYyNWM0MjJlMDg3OWU1MTIyZjM3ZDIiLCJlbWFpbCI6Imp1YW4ucHJ1ZWJhQGFmaW5hcnRlc3R1ZGlvLmNvbSIsInRpbWVzdGFtcCI6MTc1OTQ0NTgwMDMwN30=.YWZpbmFydGUtc3R1ZGlvLXN1cGVyLXNlY3JldC1qd3Qta2V5LTIwMjV7InVzZXJJZCI6IjY4NjI1YzQyMmUwODc5ZTUxMjJmMzdkMiIsImVtYWlsIjoianVhbi5wcnVlYmFAYWZpbmFydGVzdHVkaW8uY29tIiwidGltZXN0YW1wIjoxNzU5NDQ1ODAwMzA3fQ==",
    "loginTime": "2025-10-02T22:56:40.307Z",
    "expiresIn": "24h"
  }
}
```

## State Management

The authentication state includes:
- `user`: User object with profile information
- `token`: JWT token for API authentication
- `isAuthenticated`: Boolean indicating login status
- `isLoading`: Boolean for loading states
- `error`: Error message if any

## Security Features

1. **Token Storage**: Tokens are stored in localStorage for persistence
2. **Automatic Headers**: All API requests automatically include the Bearer token
3. **Error Handling**: Comprehensive error handling for failed requests
4. **Logout Cleanup**: Complete cleanup of stored data on logout

## Best Practices

1. **Always use the useAuth hook** to access authentication state
2. **Use the useApi hook** for API calls with loading states
3. **Check isAuthenticated** before rendering protected content
4. **Handle loading states** for better UX
5. **Use error boundaries** for error handling

## Example Components

See `src/components/molecules/UserProfile/UserProfile.jsx` for an example of how to use the authentication system in a component.
