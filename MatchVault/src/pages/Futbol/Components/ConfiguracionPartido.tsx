import type React from "react";
import { useNavigate } from "react-router-dom";
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";
import { useJugadoresContext } from "../context/JugadoresContext";
import { useState } from "react";
import PopUpImport from "./PopUpImport";
import { handleAmonestaciones } from "../handlers/ConfiguracioPartido/handleAmonestaciones";
import { handlePenalties } from "../handlers/ConfiguracioPartido/handlePenalties";
import { handleProrroga } from "../handlers/ConfiguracioPartido/handleProrroga";

function ConfiguracionPartido(): React.JSX.Element {

  // consumiento el provider de Datos del partido
  const {
    duracion,
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
    nombreA,
    nombreB

  } = useDatosDelPartidoContext()

  // consumiendo datos de los equipos para resetear los campos

  const { setEquipoA, setEquipoB } = useJugadoresContext();
  const navigate = useNavigate();

  //popup 
  const [mostrarPopup, setMostrarPopup] = useState(false);

  function handleRedirect(): void {
    navigate("/futbol-express");
  }


  return(
<>
  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-[#121212] w-full max-w-6xl mx-auto">
  {mostrarPopup && (
    <PopUpImport
      mostrarPopUp={mostrarPopup}
      setMostrarPopUp={setMostrarPopup}
    />
  )}

  {/* Columna 1 */}
  <div className="p-3 bg-[#1F1F1F] text-[#EAEAEA] rounded-lg shadow border border-[#333] flex flex-col space-y-3">
    <div>
      <label className="flex items-center space-x-2 w-fit">
        <span className="font-semibold text-sm">Amonestaciones</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={amonestaciones}
            onChange={() => {
              handleAmonestaciones(amonestaciones, setAmonestaciones);
            }}
          />
          <div className="w-11 h-6 bg-[#333] rounded-full peer-checked:bg-[#D4AF37]"></div>
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
        </label>
      </label>
    </div>

    <div>
      <label htmlFor="montoAmarilla" className="block text-sm">Monto por tarjeta Amarilla</label>
      <input
        name="montoAmarilla"
        type="text"
        className="border border-[#444] bg-[#121212] text-[#EAEAEA] px-2 py-1 w-full rounded focus:outline-none"
        disabled={!amonestaciones}
        value={montoAmarilla}
        onChange={e => {
          const val = parseInt(e.target.value);
          setMontoAmarilla(isNaN(val) ? 0 : val);
        }}
      />
    </div>

    <div>
      <label htmlFor="montoRoja" className="block text-sm">Monto por tarjeta Roja</label>
      <input
        name="montoRoja"
        type="text"
        className="border border-[#444] bg-[#121212] text-[#EAEAEA] px-2 py-1 w-full rounded focus:outline-none"
        disabled={!amonestaciones}
        value={montoRoja}
        onChange={e => {
          const val = parseInt(e.target.value);
          setMontoRoja(isNaN(val) ? 0 : val);
        }}
      />
    </div>
  </div>

  {/* Columna 2 */}
  <div className="p-3 bg-[#1F1F1F] text-[#EAEAEA] rounded-lg shadow border border-[#333] flex flex-col space-y-3">
    <div>
      <label htmlFor="duration" className="block text-sm">Duración del Partido (minutos)</label>
      <input
        name="duration"
        type="text"
        className="border border-[#444] bg-[#121212] text-[#EAEAEA] px-2 py-1 w-full rounded focus:outline-none"
        value={duracion}
        onChange={e => {
          const val = parseInt(e.target.value);
          setDuracion(isNaN(val) ? 0 : val);
        }}
      />
    </div>

    <div className="flex justify-between items-center">
      <span className="text-sm">Penalties</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={penalties}
          onChange={() => {
            handlePenalties(penalties, setPenalties);
          }}
        />
        <div className="w-11 h-6 bg-[#333] rounded-full peer-checked:bg-[#D4AF37]"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
      </label>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-sm">Prorroga</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={prorroga}
          onChange={() => {
            handleProrroga(prorroga, setProrroga);
          }}
        />
        <div className="w-11 h-6 bg-[#333] rounded-full peer-checked:bg-[#D4AF37]"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
      </label>
    </div>
  </div>

  {/* Columna 3 */}
  <div className="p-3 bg-[#1F1F1F] text-[#EAEAEA] rounded-lg shadow border border-[#333] flex flex-col space-y-3 justify-center">
    <button
      className="w-full bg-[#D4AF37] hover:bg-[#BFA434] transition text-[#121212] py-2 rounded text-sm font-semibold"
      onClick={() => {
        setEquipoA([]);
        setEquipoB([]);
        localStorage.removeItem('Lista-jugadores');
      }}
    >
      Limpiar Equipos
    </button>

    <button
      className="w-full bg-[#8AB4F8] hover:bg-[#6C9DEB] transition text-[#121212] py-2 rounded text-sm font-semibold"
      onClick={(e) => {
        e.preventDefault();
        setMostrarPopup(true);
      }}
    >
      Importar
    </button>

    <button
      className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded text-sm font-semibold"
      onClick={(e) => {
        e.preventDefault();

        localStorage.setItem('futbol-configuracion-partido', JSON.stringify({
          duracion,
          penalties,
          prorroga,
          montoAmarilla,
          montoRoja,
          amonestaciones,
          nombreA,
          nombreB,
        }));

        handleRedirect();
      }}
    >
      Empezar partido
    </button>
  </div>
</div>
</>
  );
}

export default ConfiguracionPartido;
