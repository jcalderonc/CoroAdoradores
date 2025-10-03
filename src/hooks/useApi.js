import { useState, useCallback } from 'react'
import apiService from '../services/api'

// Custom hook for making API calls with loading states
export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const makeRequest = useCallback(async (apiCall) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiCall()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Convenience methods for common API operations
  const get = useCallback((endpoint, options = {}) => {
    return makeRequest(() => apiService.get(endpoint, options))
  }, [makeRequest])

  const post = useCallback((endpoint, data, options = {}) => {
    return makeRequest(() => apiService.post(endpoint, data, options))
  }, [makeRequest])

  const put = useCallback((endpoint, data, options = {}) => {
    return makeRequest(() => apiService.put(endpoint, data, options))
  }, [makeRequest])

  const del = useCallback((endpoint, options = {}) => {
    return makeRequest(() => apiService.delete(endpoint, options))
  }, [makeRequest])

  return {
    loading,
    error,
    makeRequest,
    get,
    post,
    put,
    delete: del
  }
}

export default useApi
