import type { Dispatch } from "react"

interface exportProps {
    setShowExport:Dispatch<React.SetStateAction<boolean>>
    showExport:boolean

}


const ExportarPartido:React.FC<exportProps> = (
    {setShowExport,showExport}
) => {

    function DescargarPartido(){

        // descargar los elementos del local storage
        const dataEventos = localStorage.getItem('futbol-eventos')
        const dataDatosPartido = localStorage.getItem('futbol-configuracion-partido')
        const dataJugadores = localStorage.getItem('Lista-jugadores')

        console.log("DATOS DEL PARTIDO DESCARGAR ", dataDatosPartido)
        console.log("EVENTOS DESCARGAR ", dataEventos)
        // verificar que no esten vacios
        if (!dataEventos || !dataDatosPartido || !dataJugadores ){
            throw new Error("No existen los datos solicitados en el LS")
        }

        // extraer los equipos 
        const {equipoA, equipoB } = JSON.parse(dataJugadores)

        // extraer la cfg del partido
        const {penalties,
            prorroga,
            amonestaciones,
            montoAmarilla,
            montoRoja,
            duracion, 
            nombreEquipoA, 
            nombreEquipoB,
            scoreA,
            scoreB
        } = JSON.parse(dataDatosPartido) 

        
        if (equipoA === null || equipoB === null){
            throw new Error("No hay equipos")
        }


        if (dataEventos === null || dataDatosPartido === null || dataJugadores === null){
            throw new Error("No existen datos del partido")
        }

        // formateando la exportacion
        const formated = {
                    "equipoA": equipoA,
                    "equipoB":equipoB,
                    "montoAmarilla":montoAmarilla,
                    "montoRoja":montoRoja,
                    "duracion":duracion,
                    "penalties":penalties,
                    "prorroga":prorroga,
                    "amonestaciones":amonestaciones,
                    "eventos":JSON.parse(dataEventos),
                    "nombreEquipoA": nombreEquipoA,
                    "nombreEquipoB": nombreEquipoB,
                    "scoreA":scoreA,
                    "scoreB":scoreB,
                }
        
        // convertimos el json a string

        const contenido = JSON.stringify(formated, null, 2);
        const blob = new Blob([contenido], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = "partido-exportado.json"; // nombre más descriptivo
        enlace.type = "application/json";

        // esto garantiza que el clic funcione
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);

        URL.revokeObjectURL(url);
    }
    

    return (
        <>
            {/* Modal sin fondo negro */}
            { showExport && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center space-y-6 p-6">
                    <h2 className="text-xl text-black font-semibold">¡Hola!</h2>

                    <label className="block text-black mb-2 text-left">
                    Descarga el archivo
                    </label>

                    <button 
                    className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded text-sm"
                        onClick={()=> {
                            DescargarPartido()
                        }}
                    >Descargar el Partido</button>

                    <button
                    onClick={() => setShowExport(false)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded mt-4"
                    >
                    Cerrar
                    </button>
                </div>
                </div>
            )}
         </>
    )
}


export default ExportarPartido


