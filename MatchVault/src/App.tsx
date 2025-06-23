import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SelectSportMenu from "./pages/SelectSportMenu"
import FutbolExpress from "./pages/Futbol/FutbolExpress"
import FutbolConfigExpress from "./pages/Futbol/FutbolConfigExpress"
import { JugadoresContext } from "./pages/Futbol/context/JugadoresContext"
import { useState } from "react"
import type { jugador } from "./types/types"
import { DatosPartidoContext} from './pages/Futbol/context/DatosDelPartidoContext';
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


  const [duracion, setDuracion] = useState<number>(1800)
  const [amonestaciones, setAmonestaciones] = useState(false);
  const [montoAmarilla, setMontoAmarilla] = useState<number>(0)
  const [montoRoja, setMontoRoja] = useState<number>(0)
  const [penalties, setPenalties] = useState(false)
  const [prorroga, setProrroga] = useState(false)




  return (
    <>
    <JugadoresContext.Provider value={{setEquipoA,setEquipoB, equipoA, equipoB}}>
    <DatosPartidoContext.Provider value={
      {duracion,
      amonestaciones,
      montoAmarilla,
      montoRoja,
      penalties,
      prorroga,
      setDuracion,
      setAmonestaciones,
      setMontoAmarilla,
      setMontoRoja,
      setPenalties,
      setProrroga,
      }}>

    <Router>
      <Routes>
          <Route path="/" element={<SelectSportMenu/>}/>
          <Route path="/express-futbol-config" element={<FutbolConfigExpress/>}/>
          <Route path="/futbol-express" element={<FutbolExpress/>}/>
        
      </Routes>
    </Router>
    </DatosPartidoContext.Provider>
    </JugadoresContext.Provider>
    </>
  )
}

export default App
