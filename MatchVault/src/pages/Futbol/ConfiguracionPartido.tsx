import type React from "react";
import { useNavigate } from "react-router-dom";

function ConfiguracionPartido(): React.JSX.Element {
  const navigate = useNavigate();

  function handleRedirect(): void {
    navigate("/futbol-express");
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-2">
      {/* Columna 1 */}
      <div className="p-3 bg-purple-100 text-black rounded-lg shadow border border-purple-300 flex flex-col space-y-3">
        <div>
          <label className="flex items-center space-x-2">
            <span className="font-semibold text-sm">Amonestaciones</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
            </label>
          </label>
        </div>

        <div>
          <label htmlFor="montoAmarilla" className="block text-sm">Monto por tarjeta Amarilla</label>
          <input name="montoAmarilla" type="text" className="border border-gray-300 px-2 py-1 w-full rounded" />
        </div>

        <div>
          <label htmlFor="montoRoja" className="block text-sm">Monto por tarjeta Roja</label>
          <input name="montoRoja" type="text" className="border border-gray-300 px-2 py-1 w-full rounded" />
        </div>
      </div>

      {/* Columna 2 */}
      <div className="p-3 bg-purple-100 text-black rounded-lg shadow border border-purple-300 flex flex-col space-y-3">
        <div>
          <label htmlFor="duration" className="block text-sm">Duración del Partido (en minutos)</label>
          <input name="duration" type="text" className="border border-gray-300 px-2 py-1 w-full rounded" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Penalties</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Prorroga</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
          </label>
        </div>
      </div>

      {/* Columna 3 */}
      <div className="p-3 bg-purple-100 text-black rounded-lg shadow border border-purple-300 flex flex-col space-y-3 justify-center">
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded text-sm">
          Importar
        </button>
        <button
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded text-sm"
          onClick={handleRedirect}
        >
          Empezar partido
        </button>
      </div>
    </div>
  );
}

export default ConfiguracionPartido;
