// Login service for authentication
class LoginService {
  constructor() {
    this.baseURL = 'https://677e4m4847.execute-api.us-east-1.amazonaws.com/default'
  }

  // Login endpoint
  async login(email, password) {
    console.log('🚀 LoginService: Iniciando login...', {
      url: `${this.baseURL}/asAuth`,
      email: email
    })

    try {
      const response = await fetch(`${this.baseURL}/asAuth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      console.log('📡 LoginService: Respuesta recibida', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })

      const data = await response.json()
      console.log('📋 LoginService: Datos parseados', data)
      
      return { response, data }
    } catch (error) {
      console.error('❌ LoginService: Error en la petición', {
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
const loginService = new LoginService()
export default loginService
