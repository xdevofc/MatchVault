import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SelectSportMenu from "./pages/SelectSportMenu"
import FutbolExpress from "./pages/Futbol/FutbolExpress"
import FutbolConfigExpress from "./pages/Futbol/FutbolConfigExpress"
import ContextWrapper from "./pages/Futbol/context/ContextWrapper"
function App() {

 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SelectSportMenu />} />
          <Route path="/futbol-config-express" element={
              <ContextWrapper>
                <FutbolConfigExpress />
              </ContextWrapper>
            } />
          <Route path="/futbol-express" element={
              <ContextWrapper>
                <FutbolExpress />
              </ContextWrapper>
            } />

        </Routes>
      </Router> 
    </>
  )
}

export default App
