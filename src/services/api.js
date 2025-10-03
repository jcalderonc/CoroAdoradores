// API service with authentication interceptor
class ApiService {
  constructor() {
    this.baseURL = 'https://677e4m4847.execute-api.us-east-1.amazonaws.com/default'
    this.getAuthToken = null // This will be set by the auth context
  }

  // Set the function to get auth token (called from AuthContext)
  setAuthTokenGetter(getTokenFn) {
    this.getAuthToken = getTokenFn
  }

  // Get headers with authentication
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    }

    // Add auth token if available
    if (this.getAuthToken) {
      const token = this.getAuthToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: this.getHeaders(options.headers),
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Authentication endpoints
  async login(email, password) {
    return this.request('/asAuth', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  // Example of other authenticated endpoints
  async getUserProfile() {
    return this.request('/user/profile', {
      method: 'GET'
    })
  }

  async updateUserProfile(userData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  // Generic GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options
    })
  }

  // Generic POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    })
  }

  // Generic PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    })
  }

  // Generic DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options
    })
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService
