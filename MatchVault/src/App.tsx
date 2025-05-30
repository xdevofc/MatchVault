import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SelectSportMenu from "./pages/SelectSportMenu/SelectSportMenu"
import FutbolConfigExpress from "./pages/Futbol/FutbolConfigExpress"
import FutbolConfigTorneo from "./pages/Futbol/FutbolConfigTorneo"
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SelectSportMenu/>}/>
        <Route path="/express-futbol-config" element={<FutbolConfigExpress/>}/>
        <Route path="/torneo-futbol-config" element={<FutbolConfigTorneo/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
