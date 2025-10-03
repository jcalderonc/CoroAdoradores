// Signup service for user registration
class SignupService {
  constructor() {
    this.baseURL = 'https://020mf9w4ge.execute-api.us-east-1.amazonaws.com/default'
  }

  // Signup endpoint
  async signup(userData) {
    console.log('🚀 SignupService: Iniciando registro...', {
      url: `${this.baseURL}/asSignup`,
      userData: { ...userData, password: '[HIDDEN]' }
    })

    try {
      const response = await fetch(`${this.baseURL}/asSignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      console.log('📡 SignupService: Respuesta recibida', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })

      const data = await response.json()
      console.log('📋 SignupService: Datos parseados', data)
      
      return { response, data }
    } catch (error) {
      console.error('❌ SignupService: Error en la petición', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        type: error.constructor.name
      })
      
      // Re-lanzar el error para que el componente lo maneje
      throw error
    }
  }
}

// Create and export a singleton instance
const signupService = new SignupService()
export default signupService
