import Header from "./components/organisms/Header/Header";
import Scheduler from "./components/organisms/Scheduler/Scheduler";
import Stats from "./components/organisms/Stats/Stats";
import Login from "./components/organisms/Login/Login";
import Register from "./components/organisms/Register/Register";
import { useState } from "react";
function App() {
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <main className="pt-8 px-6">
        <div className="max-w-6xl mx-auto">
          {selectedPage === "Calendario" && <Stats />}
          {selectedPage === "Calendario" && <Scheduler />}
          {selectedPage === "Login" && <Login />}
          {selectedPage === "Registro" && <Register />}
        </div>
      </main>
    </div>
  );
}

export default App;
