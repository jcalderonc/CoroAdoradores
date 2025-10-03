import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../../../context/ToastContext'
import toastService from '../../../services/toastService'
import Button from '../../atoms/Button/Button'

function Login({ onLoginSuccess, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const { login, isLoading } = useAuth()
  const toast = useToast()

  // Set up toast service
  useEffect(() => {
    toastService.setToastFunctions(toast)
  }, [toast])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(formData.email, formData.password)
    
    if (!result.success) {
      // Check for specific error types and show appropriate toast
      if (result.message.toLowerCase().includes('usuario') || 
          result.message.toLowerCase().includes('user') ||
          result.message.toLowerCase().includes('not found') ||
          result.message.toLowerCase().includes('no encontrado') ||
          result.message.toLowerCase().includes('does not exist') ||
          result.message.toLowerCase().includes('no existe')) {
        toastService.userNotFound()
      } else if (result.message.toLowerCase().includes('password') ||
                 result.message.toLowerCase().includes('contraseña') ||
                 result.message.toLowerCase().includes('invalid') ||
                 result.message.toLowerCase().includes('incorrect') ||
                 result.message.toLowerCase().includes('wrong') ||
                 result.message.toLowerCase().includes('credentials')) {
        toastService.invalidCredentials()
      } else {
        toastService.loginError(result.message)
      }
    } else {
      // Login successful - show success toast and redirect
      toastService.loginSuccess(formData.email.split('@')[0])
      
      // Small delay to show success toast before redirect
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess()
        }
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-2 text-gray-600">Accede a tu cuenta del coro</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="tu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tu contraseña"
              />
            </div>
          </div>


          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* Link to Register */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => onNavigate && onNavigate("Registro")}
                className="font-medium text-orange-600 hover:text-orange-500 bg-transparent border-none cursor-pointer"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login