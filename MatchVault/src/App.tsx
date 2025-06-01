import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SelectSportMenu from "./pages/SelectSportMenu"
import FutbolExpress from "./pages/Futbol/FutbolExpress"
import FutbolConfigExpress from "./pages/Futbol/FutbolConfigExpress"
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SelectSportMenu/>}/>
        <Route path="/express-futbol-config" element={<FutbolConfigExpress/>}/>
        <Route path="/futbol-express" element={<FutbolExpress/>}/>
        
      </Routes>
    </Router>
    </>
  )
}

export default App
