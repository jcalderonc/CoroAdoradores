import logoCoro from '../../assets/logo.png'

function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg border-b-4 border-orange-400">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src={logoCoro} 
            alt="Logo Coro Adoradores San Rafael Arcángel" 
            className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-400"
          />
          <div>
            <h1 className="text-xl font-bold text-orange-50">Coro Adoradores</h1>
            <p className="text-sm text-orange-200">San Rafael Arcángel</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#inicio" className="hover:text-orange-300 transition-colors duration-200 font-medium">Inicio</a></li>
            <li><a href="#agendar" className="hover:text-orange-300 transition-colors duration-200 font-medium">Agendar Cita</a></li>
            <li><a href="#contacto" className="hover:text-orange-300 transition-colors duration-200 font-medium">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header