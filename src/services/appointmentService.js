// Appointment service for managing appointments
class AppointmentService {
  constructor() {
    // Use CORS proxy for development, direct URL for production
    this.baseURL =  'https://23gqguri2b.execute-api.us-east-1.amazonaws.com/default'
  }

  // Get appointments with date range and authentication
  async getAppointments(dateFrom, dateTo, token) {

    try {
      // Build URL with query parameters
      let url = `${this.baseURL}/asAppointment`
      const params = new URLSearchParams()
      
      if (dateFrom) {
        params.append('dateFrom', dateFrom.toISOString())
      }
      if (dateTo) {
        params.append('dateTo', dateTo.toISOString())
      }
      
      if (params.toString()) {
        url += '?' + params.toString()
      }

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
}

// Create and export a singleton instance
const appointmentService = new AppointmentService()
export default appointmentService
