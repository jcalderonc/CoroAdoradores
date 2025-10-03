import { useAuth } from '../../../context/AuthContext'

function Profile() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="pt-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error: No se pudo cargar la información del usuario.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Mi Perfil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Información Personal
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Nombre Completo</label>
                  <p className="text-gray-900 font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Correo Electrónico</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Rol</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {user.role}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Miembro desde</label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Avatar y Acciones */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Avatar
              </h2>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                
                <p className="text-sm text-gray-500 text-center">
                  Iniciales del nombre
                </p>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                  Cambiar Avatar
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Información de la Cuenta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">ID de Usuario</h3>
                <p className="text-sm text-gray-600 font-mono">{user.id}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Estado</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Activo
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Última Actividad</h3>
                <p className="text-sm text-gray-600">Ahora</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
