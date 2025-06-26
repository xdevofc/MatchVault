import type { Dispatch } from "react";
import { useJugadoresContext } from "../context/JugadoresContext";
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";
import { handleImportar } from "../handlers/ConfiguracioPartido/handleImportar";

interface PopUpProps {
  mostrarPopUp: boolean;
  setMostrarPopUp: Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpImport({ mostrarPopUp, setMostrarPopUp }: PopUpProps) {

    // consumiendo el context de jugadores 
    const {setEquipoA, setEquipoB,} = useJugadoresContext()


    // consumiendo context de datos del partido
    const {
        setDuracion,
        setAmonestaciones,
        setMontoAmarilla,
        setMontoRoja,
        setPenalties,
        setProrroga,
        setNombreEquipoA,
        setNombreEquipoB,
        setScoreA,
        setScoreB,
      } = useDatosDelPartidoContext()
     

  return (
    <>
  {/* Modal sin fondo negro */}
  {mostrarPopUp && (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center space-y-6 p-6">
        <h2 className="text-xl text-black font-semibold">¡Hola!</h2>

        <label className="block text-black mb-2 text-left">
          Elige el Archivo para importar
        </label>

        <input
          type="file"
          className="border border-gray-400 rounded px-4 py-2 cursor-pointer shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 block mx-auto bg-white"
          onChange={(e) => {
            handleImportar(e, setMostrarPopUp,
                setDuracion,
                setAmonestaciones,
                setMontoAmarilla,
                setMontoRoja,
                setPenalties,
                setProrroga,
                setEquipoA,
                setEquipoB,
                setNombreEquipoA,
                setNombreEquipoB,
                setScoreA,
                setScoreB,
            );
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault()
            setMostrarPopUp(false)
          }}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  )}
</>


  );
}
