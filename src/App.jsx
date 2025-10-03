import Header from "./components/organisms/Header/Header";
import Home from "./components/organisms/Home/Home";
import Scheduler from "./components/organisms/Scheduler/Scheduler";
import Stats from "./components/organisms/Stats/Stats";
import Login from "./components/organisms/Login/Login";
import Register from "./components/organisms/Register/Register";
import Profile from "./components/organisms/Profile/Profile";
import Rehearsals from "./components/organisms/Rehearsals/Rehearsals";
import MainLayout from "./components/templates/MainLayout/MainLayout";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Main App component that uses auth
function AppContent() {
  const [selectedPage, setSelectedPage] = useState("Home");
  const { isAuthenticated, isLoading, user } = useAuth();


  return (
    <MainLayout>
      {/* Show loading spinner while checking authentication */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando...</p>
          </div>
        </div>
      ) : (
        /* Show the main app for both authenticated and non-authenticated users */
        <>
          <Header 
            selectedPage={selectedPage} 
            setSelectedPage={setSelectedPage}
            user={user}
          />
          <main>
            {(selectedPage === "Home" || selectedPage === null) && <Home onNavigate={setSelectedPage} />}
            {selectedPage === "Calendario" && isAuthenticated && (
              <div className="pt-8 px-6">
                <div className="max-w-6xl mx-auto">
                  <Stats />
                  <Scheduler />
                </div>
              </div>
            )}
            {selectedPage === "Ensayos" && <Rehearsals />}
            {selectedPage === "Mi Perfil" && isAuthenticated && <Profile />}
            {selectedPage === "Login" && !isAuthenticated && (
              <div className="pt-8 px-6">
                <div className="max-w-6xl mx-auto">
                  <Login 
                    onLoginSuccess={() => setSelectedPage("Calendario")} 
                    onNavigate={setSelectedPage}
                  />
                </div>
              </div>
            )}
            {selectedPage === "Registro" && !isAuthenticated && (
              <div className="pt-8 px-6">
                <div className="max-w-6xl mx-auto">
                  <Register onNavigate={setSelectedPage} />
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </MainLayout>
  );
}

// App component wrapped with AuthProvider and ToastProvider
function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
