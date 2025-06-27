import type React from "react";
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";
import type { definirNombresProprs } from "./interfaces/definirNombres";



const DefinirNombres: React.FC<definirNombresProprs> = ({
    mostrarDefinirNombres,
    setMostrarDefinirNombres
}) => {


    const { setNombreA, setNombreB, nombreA, nombreB } = useDatosDelPartidoContext()


    function guardarNombreEquipos() {
        setNombreA(nombreA)
        setNombreB(nombreB)
        setMostrarDefinirNombres(false)
    }

    return (
        <>
            {/* Modal sin fondo negro */}
            {mostrarDefinirNombres && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center space-y-6 p-6">
                        <h2 className="text-xl text-black font-semibold">Ingrese el nombre de los equipos!</h2>

                        <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
                        <input
                            name="nombre"
                            type="text"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            value={nombreA}
                            onChange={e => setNombreA(e.target.value)}
                        />
                        <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
                        <input
                            name="nombre"
                            type="text"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            value={nombreB}
                            onChange={e => setNombreB(e.target.value)}
                        />

                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                guardarNombreEquipos()
                            }
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded mt-4"
                        >
                            Guardar Nombres
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default DefinirNombres;
