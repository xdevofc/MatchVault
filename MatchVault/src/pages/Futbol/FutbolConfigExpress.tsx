import type React from "react";
import RegisterPlayers from "./RegisterPlayers";
import ConfiguracionPartido from "./ConfiguracionPartido";


function FutbolConfigExpress(): React.JSX.Element{

    return (
        <>
           <div className="grid grid-cols-2 grid-rows-[auto,auto,auto] gap-x-4 gap-y-2 p-4">
            {/* Header */}
            <header className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
                <h1 className="text-lg font-bold leading-tight">Fútbol Configuración Express</h1>
                <p className="text-sm leading-snug">Elige la configuración que deseas</p> 
            </header>

            {/* elementos del team#1 */}
            <div className="bg-white px-4 py-2 rounded-lg shadow border">
                <h2 className="text-base font-semibold mb-1">Formulario 1</h2>
                <RegisterPlayers />
            </div>

            {/* elementos del team#2 */}
            <div className="bg-white px-4 py-2 rounded-lg shadow border">
                <h2 className="text-base font-semibold mb-1">Formulario 2</h2>
                <RegisterPlayers />
            </div>

            {/* Footer */}
            <footer className="col-span-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow">
                <ConfiguracionPartido />
                <button className="bg-green-600 px-3 py-1 rounded text-sm">Empezar partido</button>
                <button className="bg-blue-600 px-3 py-1 rounded mr-2 text-sm">Importar</button>
            </footer>
            </div>
        
       </>
    )
}

export default FutbolConfigExpress