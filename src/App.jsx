import Header from "./components/organisms/Header/Header";
import Home from "./components/organisms/Home/Home";
import Scheduler from "./components/organisms/Scheduler/Scheduler";
import Stats from "./components/organisms/Stats/Stats";
import Login from "./components/organisms/Login/Login";
import Register from "./components/organisms/Register/Register";
import { useState } from "react";
function App() {
  const [selectedPage, setSelectedPage] = useState("Home");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <main>
        {(selectedPage === "Home" || selectedPage === null) && <Home />}
        {selectedPage === "Calendario" && (
          <div className="pt-8 px-6">
            <div className="max-w-6xl mx-auto">
              <Stats />
              <Scheduler />
            </div>
          </div>
        )}
        {selectedPage === "Login" && (
          <div className="pt-8 px-6">
            <div className="max-w-6xl mx-auto">
              <Login />
            </div>
          </div>
        )}
        {selectedPage === "Registro" && (
          <div className="pt-8 px-6">
            <div className="max-w-6xl mx-auto">
              <Register />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
