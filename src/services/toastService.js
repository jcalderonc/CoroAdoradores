// Toast service with predefined messages for common scenarios
class ToastService {
  constructor() {
    this.toast = null // This will be set by the toast context
  }

  // Set the toast functions (called from components that use useToast)
  setToastFunctions(toastFunctions) {
    this.toast = toastFunctions
  }

  // Authentication related toasts
  loginSuccess = (userName = 'Usuario') => {
    if (!this.toast) return
    this.toast.success(`¡Bienvenido ${userName}! Inicio de sesión exitoso.`)
  }

  loginError = (message = 'Credenciales incorrectas') => {
    if (!this.toast) return
    this.toast.error(`Error de inicio de sesión: ${message}`)
  }

  userNotFound = () => {
    if (!this.toast) return
    this.toast.error('Usuario no encontrado. Verifica tu correo electrónico.')
  }

  invalidCredentials = () => {
    if (!this.toast) return
    this.toast.error('Credenciales inválidas. Verifica tu contraseña.')
  }

  logoutSuccess = () => {
    if (!this.toast) return
    this.toast.info('Sesión cerrada correctamente.')
  }

  // API related toasts
  apiError = (message = 'Error en la conexión') => {
    if (!this.toast) return
    this.toast.error(`Error de API: ${message}`)
  }

  networkError = () => {
    if (!this.toast) return
    this.toast.error('Error de conexión. Verifica tu internet.')
  }

  // General purpose toasts
  success = (message) => {
    if (!this.toast) return
    this.toast.success(message)
  }

  error = (message) => {
    if (!this.toast) return
    this.toast.error(message)
  }

  info = (message) => {
    if (!this.toast) return
    this.toast.info(message)
  }

  warning = (message) => {
    if (!this.toast) return
    this.toast.warning(message)
  }

  // Form validation toasts
  requiredField = (fieldName) => {
    if (!this.toast) return
    this.toast.warning(`El campo ${fieldName} es requerido.`)
  }

  invalidEmail = () => {
    if (!this.toast) return
    this.toast.warning('Por favor ingresa un correo electrónico válido.')
  }

  passwordTooShort = () => {
    if (!this.toast) return
    this.toast.warning('La contraseña debe tener al menos 6 caracteres.')
  }

  // Data operation toasts
  dataSaved = (itemName = 'Datos') => {
    if (!this.toast) return
    this.toast.success(`${itemName} guardados correctamente.`)
  }

  dataUpdated = (itemName = 'Datos') => {
    if (!this.toast) return
    this.toast.success(`${itemName} actualizados correctamente.`)
  }

  dataDeleted = (itemName = 'Datos') => {
    if (!this.toast) return
    this.toast.info(`${itemName} eliminados correctamente.`)
  }

  dataLoadError = (itemName = 'Datos') => {
    if (!this.toast) return
    this.toast.error(`Error al cargar ${itemName.toLowerCase()}.`)
  }

  // Permission toasts
  accessDenied = () => {
    if (!this.toast) return
    this.toast.error('No tienes permisos para realizar esta acción.')
  }

  sessionExpired = () => {
    if (!this.toast) return
    this.toast.warning('Tu sesión ha expirado. Por favor inicia sesión nuevamente.')
  }
}

// Create and export a singleton instance
const toastService = new ToastService()
export default toastService
