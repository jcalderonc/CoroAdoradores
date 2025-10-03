import ToastContainer from '../../atoms/Toast/ToastContainer'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      {children}
      
      {/* Global UI elements */}
      <ToastContainer />
      
      {/* Future common elements can be added here:
          - Modal overlays
          - Loading spinners
          - Global notifications
          - Error boundaries
          - etc.
      */}
    </div>
  )
}

export default MainLayout
