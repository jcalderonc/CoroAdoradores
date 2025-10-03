import { createContext, useContext, useReducer } from 'react'

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}

// Initial state
const initialState = {
  toasts: []
}

// Action types
const TOAST_ACTIONS = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  CLEAR_ALL: 'CLEAR_ALL'
}

// Reducer function
const toastReducer = (state, action) => {
  switch (action.type) {
    case TOAST_ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      }
    
    case TOAST_ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      }
    
    case TOAST_ACTIONS.CLEAR_ALL:
      return {
        ...state,
        toasts: []
      }
    
    default:
      return state
  }
}

// Create context
const ToastContext = createContext()

// ToastProvider component
export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  // Add toast function
  const addToast = (message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      type,
      duration
    }

    dispatch({
      type: TOAST_ACTIONS.ADD_TOAST,
      payload: toast
    })

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  // Remove toast function
  const removeToast = (id) => {
    dispatch({
      type: TOAST_ACTIONS.REMOVE_TOAST,
      payload: id
    })
  }

  // Clear all toasts
  const clearAll = () => {
    dispatch({
      type: TOAST_ACTIONS.CLEAR_ALL
    })
  }

  // Convenience methods
  const success = (message, duration = 5000) => {
    return addToast(message, TOAST_TYPES.SUCCESS, duration)
  }

  const error = (message, duration = 7000) => {
    return addToast(message, TOAST_TYPES.ERROR, duration)
  }

  const info = (message, duration = 5000) => {
    return addToast(message, TOAST_TYPES.INFO, duration)
  }

  const warning = (message, duration = 6000) => {
    return addToast(message, TOAST_TYPES.WARNING, duration)
  }

  const value = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    info,
    warning
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

// Custom hook to use toast context
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastContext
