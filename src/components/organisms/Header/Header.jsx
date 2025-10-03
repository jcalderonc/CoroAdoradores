import logoCoro from "../../../assets/logo.png";
import { MenuButton } from "../../atoms/MenuButton/MenuButton";
import Button from "../../atoms/Button/Button";
import IconButton from "../../atoms/IconButton/IconButton";
import { headerData } from "./Data";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import toastService from "../../../services/toastService";

function Header({ selectedPage, setSelectedPage, user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { logout } = useAuth();
  const toast = useToast();

  // Set up toast service
  useEffect(() => {
    toastService.setToastFunctions(toast);
  }, [toast]);

  const handleNavigate = (page) => {
    setSelectedPage(page);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    toastService.logoutSuccess();
  };

  // ✅ Función que filtra los elementos del menú basado en el estado de autenticación
  const getFilteredMenuItems = () => {
    return headerData.filter(item => {
      // Si el usuario está autenticado
      if (user) {
        // Mostrar elementos que no requieren auth O que requieren auth
        // Y que no se oculten cuando está autenticado
        return (!item.requireAuth || item.requireAuth) && !item.hideWhenAuthenticated;
      } else {
        // Si el usuario NO está autenticado
        // Mostrar solo elementos que no requieren auth
        return !item.requireAuth;
      }
    });
  };

  // ✅ Función que renderiza los botones
  const renderMenuItems = (isMobile = false) => {
    const filteredItems = getFilteredMenuItems();
    
    return filteredItems.map((item, index) => (
      <li key={index} className={isMobile ? "w-full" : ""}>
        <MenuButton
          key={item.id}
          href={item.href}
          active={selectedPage === item.label}
          onNavigate={() => handleNavigate(item.label)}
          className={isMobile ? "w-full text-center" : ""}
        >
          {item.label}
        </MenuButton>
      </li>
    ));
  };

  return (
    <header
      className="text-white shadow-lg border-b-4 border-yellow-600"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigate("Home")}
          >
            <img
              src={logoCoro}
              alt="Logo Coro Adoradores San Rafael Arcángel"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-yellow-600"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Coro Adoradores</h1>
              <p className="text-sm text-gray-200">San Rafael Arcángel</p>
            </div>
          </div>

          {/* Botón hamburguesa (solo mobile) */}
          <IconButton
            variant="ghost"
            size="lg"
            className="md:hidden text-white hover:text-yellow-400"
            onClick={toggleMenu}
            icon={
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            }
          />

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                {renderMenuItems(false)} {/* ← Reutilizar función */}
              </ul>
            </nav>
            
            {/* User Menu */}
            {user && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 hover:bg-transparent p-2"
                >
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm">{user.firstName || user.email}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
                
                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <p 
                        className="text-gray-500 truncate" 
                        title={user.email}
                      >
                        {user.email}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full justify-start text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Menú mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-3">
              {renderMenuItems(true)} {/* ← Reutilizar función */}
            </ul>
            
            {/* Mobile User Menu */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="px-4 py-2 text-sm text-gray-200">
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p 
                    className="text-gray-300 truncate" 
                    title={user.email}
                  >
                    {user.email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start text-gray-200 hover:text-yellow-400 hover:bg-transparent"
                >
                  Cerrar Sesión
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
