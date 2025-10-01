import logoCoro from "../../../assets/logo.png";
import { MenuButton } from "../../atoms/MenuButton/MenuButton";
import { headerData } from "./Data";
import { useState } from "react";

function Header({ selectedPage, setSelectedPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    setSelectedPage(page);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ✅ Función que renderiza los botones
  const renderMenuItems = (isMobile = false) => {
    return headerData.map((item, index) => (
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
          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Menú desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {renderMenuItems(false)} {/* ← Reutilizar función */}
            </ul>
          </nav>
        </div>

        {/* Menú mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-3">
              {renderMenuItems(true)} {/* ← Reutilizar función */}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
