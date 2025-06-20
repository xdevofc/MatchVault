import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectSportMenu(): React.JSX.Element {
  const [modalidad, setModalidad] = useState("Express");
  const [deporte, setDeporte] = useState("Futbol");
  const navigate = useNavigate();

  function handleRedirect(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // evitar recarga
    navigate(`/${modalidad}-${deporte}-config`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenidos a MatchVault</h1>
        
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="select-deporte" className="block text-sm font-medium mb-1">Elige el deporte</label>
            <select
              name="Deportes"
              id="select-deporte"
              value={deporte}
              onChange={e => setDeporte(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Futbol">Futbol</option>
              <option value="Basketball">Basketball</option>
              <option value="Ping-Pong">Ping Pong</option>
              <option value="Volleyball">Volleyball</option>
            </select>
          </div>

          <div>
            <label htmlFor="select-modalidad" className="block text-sm font-medium mb-1">Elige una modalidad</label>
            <select
              name="modalidad"
              id="select-modalidad"
              value={modalidad}
              onChange={e => setModalidad(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Express">Express</option>
              <option value="Torneo">Torneo</option>
            </select>
          </div>

          <button
            onClick={handleRedirect}
            className="bg-purple-500 text-white font-semibold rounded-lg p-2 transition-colors duration-300 hover:bg-purple-700"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelectSportMenu;
