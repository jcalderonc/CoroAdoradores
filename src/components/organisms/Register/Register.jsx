import { useState } from "react";
import toastService from "../../../services/toastService";
import signupService from "../../../services/signupService";
import Button from "../../atoms/Button/Button";

function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Todos los campos obligatorios deben ser completados");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }


    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    console.log('🎯 Register Component: Iniciando proceso de registro...', formData);

    try {
      // Preparar datos para la API
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        acceptTerms: true, // Siempre true ya que eliminamos el checkbox
      };

      console.log('📤 Register Component: Llamando al signupService...', userData);
      const { response, data } = await signupService.signup(userData);

      if (data.success) {
        setSuccess(true);
        // Mostrar toast con el nombre del usuario registrado
        const userName = data.data?.user?.firstName || 'Usuario';
        toastService.registrationSuccess(userName);
      } else {
        // Manejar diferentes tipos de errores
        if (data.message === "User with this email already exists") {
          setError("Este correo electrónico ya está registrado. Por favor, usa otro correo o inicia sesión.");
          toastService.userAlreadyExists();
        } else {
          setError(data.message || "Error al crear la cuenta. Inténtalo de nuevo.");
          toastService.registrationError();
        }
      }
    } catch (err) {
      console.error('❌ Register Component: Error en registro', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        type: err.constructor.name
      });

      // Detectar diferentes tipos de errores
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        if (err.message.includes('CORS') || err.message.includes('access control')) {
          setError("Error de configuración del servidor (CORS). Contacta al administrador.");
          toastService.corsError();
          console.error('🚨 Error CORS detectado - El servidor no permite peticiones desde este dominio');
        } else {
          setError("Error de conexión. Verifica tu internet e inténtalo de nuevo.");
          toastService.networkError();
        }
      } else if (err.name === 'NetworkError') {
        setError("Sin conexión a internet. Verifica tu conexión.");
        toastService.networkError();
      } else {
        setError("Error inesperado. Inténtalo de nuevo.");
        toastService.registrationError();
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              ¡Cuenta creada exitosamente!
            </h3>
            <p className="mt-2">
              Ya puedes iniciar sesión con tu nueva cuenta.
            </p>
            <button
              onClick={() => onNavigate && onNavigate("Login")}
              className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
          <p className="mt-2 text-gray-600">
            Únete al sistema de citas del coro
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tu nombre"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tu apellido"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico *
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

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="555-1234"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Repite tu contraseña"
              />
            </div>

          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>

          {/* Link to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => onNavigate && onNavigate("Login")}
                className="font-medium text-orange-600 hover:text-orange-500 bg-transparent border-none cursor-pointer"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
