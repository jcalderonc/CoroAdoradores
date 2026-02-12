// Appointment service for managing appointments
class AppointmentService {
  constructor() {
    // Use CORS proxy for development, direct URL for production
    this.baseURL =  'https://23gqguri2b.execute-api.us-east-1.amazonaws.com/default'
  }

  // Get appointments with date range and optional status filter
  async getAppointments(dateFrom, dateTo, token, options = {}) {
    try {
      let url = `${this.baseURL}/asAppointment`
      const params = new URLSearchParams()

      if (dateFrom) params.append('dateFrom', dateFrom.toISOString())
      if (dateTo) params.append('dateTo', dateTo.toISOString())
      if (options.status) params.append('status', options.status)

      if (params.toString()) url += '?' + params.toString()

      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return { response, data }
    } catch (error) {
      throw error
    }
  }

  async createAppointment(
    { email, date, type, comments = '', location = '', status, totalAmount, balanceDue },
    token
  ) {
    try {
      const url = `${this.baseURL}/asAppointment`
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const body = { email, date, type, comments, location }
      if (status !== undefined && status !== '') body.status = status
      if (typeof totalAmount === 'number' && !Number.isNaN(totalAmount)) {
        body.totalAmount = Math.round(totalAmount * 100) / 100
      }
      if (typeof balanceDue === 'number' && !Number.isNaN(balanceDue)) {
        body.balanceDue = Math.round(balanceDue * 100) / 100
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) {
        const err = new Error(data.message || `HTTP error! status: ${response.status}`)
        err.status = response.status
        err.data = data
        throw err
      }
      return { response, data }
    } catch (error) {
      throw error
    }
  }

  async deleteAppointment(id, token) {
    try {
      const url = `${this.baseURL}/asAppointment?id=${encodeURIComponent(id)}`
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const response = await fetch(url, { method: 'DELETE', headers })
      const data = await response.json()
      if (!response.ok) {
        const err = new Error(data.message || `HTTP error! status: ${response.status}`)
        err.status = response.status
        err.data = data
        throw err
      }
      return { response, data }
    } catch (error) {
      throw error
    }
  }
}

// Create and export a singleton instance
const appointmentService = new AppointmentService()
export default appointmentService
