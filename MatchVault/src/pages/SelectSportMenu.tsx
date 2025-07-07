import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectSportMenu(): React.JSX.Element {
  const [modalidad, setModalidad] = useState("express");
  const [deporte, setDeporte] = useState("futbol");

  // instanciando navigate para moverme de ruta 
    const navigate = useNavigate()

  // usamos navigate para ir a la ruta deseada 
  function handleGoRoute(){



    console.log(`DATOS DE ENVIO: ${deporte} ${modalidad}`)
      switch (deporte) {
      case "futbol":
        if(modalidad == 'express'){
          navigate(`${deporte}-config-${modalidad}`)
        }else{
          navigate(`${deporte}-${modalidad}`)
        }
        break;
      case "basketball":
        navigate(`${deporte}-${modalidad}`)
        break;
      case "ping-pong":
        navigate(`${deporte}-${modalidad}`)
        break 
      default:
        break;
    }
  }

 
  


  return (

    
   <>
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
    <div className="bg-[#1F1F1F] p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-[#EAEAEA]">Bienvenidos a MatchVault</h1>

      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="select-deporte" className="block text-sm font-medium mb-1 text-[#EAEAEA]">Elige el deporte</label>
          <select
            name="Deportes"
            id="select-deporte"
            value={deporte}
            onChange={e => setDeporte(e.target.value)}
            className="w-full border border-[#333] bg-[#1F1F1F] text-[#EAEAEA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="futbol">Futbol</option>
            <option value="basketball">Basketball</option>
            <option value="ping-pong">Ping Pong</option>
          </select>
        </div>

        <div>
          <label htmlFor="select-modalidad" className="block text-sm font-medium mb-1 text-[#EAEAEA]">Elige una modalidad</label>
          <select
            name="modalidad"
            id="select-modalidad"
            value={modalidad}
            onChange={e => setModalidad(e.target.value)}
            className="w-full border border-[#333] bg-[#1F1F1F] text-[#EAEAEA] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="express">Express</option>
          </select>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            handleGoRoute()
          }}
          className="bg-[#D4AF37] text-[#121212] font-semibold rounded-lg p-2 transition-colors duration-300 hover:bg-[#BFA434]"
        >
          Enviar
        </button>
      </form>
    </div>
    </div>
</>

  );
}

export default SelectSportMenu;
