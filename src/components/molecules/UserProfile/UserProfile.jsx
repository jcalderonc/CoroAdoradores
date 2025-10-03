import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import useApi from '../../../hooks/useApi'

function UserProfile() {
  const { user } = useAuth()
  const { get, loading, error } = useApi()
  const [profileData, setProfileData] = useState(null)

  // Example of how to fetch user profile data using authenticated API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This would call an authenticated endpoint
        // const data = await get('/user/profile')
        // setProfileData(data)
        
        // For now, just use the user data from context
        setProfileData(user)
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user, get])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfil de Usuario</h3>
      
      {profileData && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-500">Nombre:</label>
            <p className="text-gray-900">{profileData.firstName} {profileData.lastName}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Email:</label>
            <p className="text-gray-900">{profileData.email}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Rol:</label>
            <p className="text-gray-900 capitalize">{profileData.role}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Miembro desde:</label>
            <p className="text-gray-900">
              {new Date(profileData.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
