import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SelectSportMenu from "./pages/SelectSportMenu"
import FutbolExpress from "./pages/Futbol/FutbolExpress"
import FutbolConfigExpress from "./pages/Futbol/FutbolConfigExpress"
import ContextWrapper from "./pages/Futbol/context/ContextWrapper"
// import FutbolTorneo from "./pages/Futbol/FutbolTorneo"
import BasketBallExpress from "./pages/Basketball/BasketBallExpress"
import PingPongExpress from "./pages/PingPong/PingPongExpress"
// import PingPongTorneo from "./pages/PingPong/PingPongTorneo"
// import BasketBallTorneo from './pages/Basketball/BasketBallTorneo';
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
          {/* <Route path="/futbol-torneo" element={<FutbolTorneo/>} />  */}
          <Route path="/basketball-express" element={<BasketBallExpress/>} />
          {/* <Route path="/basketball-torneo" element={<BasketBallTorneo/>} /> */}
          <Route path="/ping-pong-express" element={<PingPongExpress/>} />
          {/* <Route path="/ping-pong-torneo" element={<PingPongTorneo/>} /> */}
        </Routes>
      </Router> 
    </>
  )
}

export default App
