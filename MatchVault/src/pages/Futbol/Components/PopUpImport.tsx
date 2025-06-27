import { useJugadoresContext } from "../context/JugadoresContext";
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";
import { handleImportar } from "../handlers/ConfiguracioPartido/handleImportar";
import type { PopUpProps } from "./interfaces/importPopUp";



export default function PopUpImport({ mostrarPopUp, setMostrarPopUp }: PopUpProps) {

  // consumiendo el context de jugadores 
  const { setEquipoA, setEquipoB, } = useJugadoresContext()


  // consumiendo context de datos del partido
  const {
    setDuracion,
    setAmonestaciones,
    setMontoAmarilla,
    setMontoRoja,
    setPenalties,
    setProrroga,
    setNombreA,
    setNombreB,
    setScoreA,
    setScoreB,
  } = useDatosDelPartidoContext()


  return (
 <>
  {mostrarPopUp && (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl p-6 space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">¡Hola!</h2>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elige el archivo para importar:
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              handleImportar(
                e,
                setMostrarPopUp,
                setDuracion,
                setAmonestaciones,
                setMontoAmarilla,
                setMontoRoja,
                setPenalties,
                setProrroga,
                setEquipoA,
                setEquipoB,
                setNombreA,
                setNombreB,
                setScoreA,
                setScoreB
              );
            }}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setMostrarPopUp(false);
          }}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  )}
</>

  );
}
