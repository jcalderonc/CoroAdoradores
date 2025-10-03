import { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true
}

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  LOAD_USER: 'LOAD_USER',
  SET_LOADING: 'SET_LOADING'
}

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }
    
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    
    default:
      return state
  }
}

// Create context
const AuthContext = createContext()

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user from localStorage on app start
  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        
        if (storedUser && storedToken) {
          dispatch({
            type: AUTH_ACTIONS.LOAD_USER,
            payload: {
              user: JSON.parse(storedUser),
              token: storedToken
            }
          })
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
        }
      } catch (error) {
        console.error('Error loading stored auth:', error)
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false })
      }
    }

    loadStoredAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START })
    
    try {
      const response = await fetch('https://677e4m4847.execute-api.us-east-1.amazonaws.com/default/asAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      // Parse the response data first
      const data = await response.json()

      if (data.success) {
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(data.data.user))
        localStorage.setItem('token', data.data.token)
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        })
        
        return { success: true, message: data.message }
      } else {
        // API returned success: false (even with 401 status)
        const errorMessage = data.message || 'Login failed'
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: errorMessage
        })
        return { success: false, message: errorMessage }
      }
    } catch (error) {
      // Network error or JSON parsing error
      const errorMessage = error.message || 'Error de conexión. Verifica tu internet.'
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage
      })
      return { success: false, message: errorMessage }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  // Get auth headers for API requests
  const getAuthHeaders = () => {
    if (state.token) {
      return {
        'Authorization': `Bearer ${state.token}`,
        'Content-Type': 'application/json'
      }
    }
    return {
      'Content-Type': 'application/json'
    }
  }

  const value = {
    ...state,
    login,
    logout,
    getAuthHeaders
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
