import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SelectSportMenu from "./pages/SelectSportMenu"
import FutbolExpress from "./pages/Futbol/FutbolExpress"
import FutbolConfigExpress from "./pages/Futbol/FutbolConfigExpress"
import { JugadoresContext } from "./pages/Futbol/context/JugadoresContext"
import { useState } from "react"
import type { jugador } from "./types/types"
function App() {

// definiendo los equipos
const [equipoA, setEquipoA] = useState<jugador[]>(() => {
    const data = localStorage.getItem("Lista-jugadores");
    return data ? JSON.parse(data).equipoA || [] : [];
  });

  const [equipoB, setEquipoB] = useState<jugador[]>(() => {
    const data = localStorage.getItem("Lista-jugadores");
    return data ? JSON.parse(data).equipoB || [] : [];
  });



  return (
    <>
    <JugadoresContext.Provider value={{setEquipoA,setEquipoB, equipoA, equipoB}}>
    <Router>
      <Routes>
          <Route path="/" element={<SelectSportMenu/>}/>
          <Route path="/express-futbol-config" element={<FutbolConfigExpress/>}/>
          <Route path="/futbol-express" element={<FutbolExpress/>}/>
        
      </Routes>
    </Router>
    </JugadoresContext.Provider>
    </>
  )
}

export default App
