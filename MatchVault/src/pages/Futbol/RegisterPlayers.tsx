import type React from "react";

function RegisterPlayers() : React.JSX.Element{

    return (
        <>
        <div className="grid grid-cols-2 gap-4 p-4"> 
            {/* Div del Listado de agregados */}
            <div className="bg-gray-100 p-4 rounded shadow border">
                {/* Aquí iría el listado de jugadores agregados */}
                <h2 className="text-lg font-semibold mb-2">Jugadores Agregados</h2>
                {/* ...Listado dinámico aquí... */}
            </div>

            {/* Div del Form */}
            <div className="bg-white p-4 rounded shadow border">
                <h2 className="text-lg font-semibold mb-2">Formulario de Jugador</h2>
                <form className="space-y-3">
                <div>
                    <label htmlFor="nombreEquipo" className="underline block">Nombre del equipo</label>
                    <input name="nombreEquipo" type="text" className="border px-2 py-1 w-full"/>
                </div>
                
                <div>
                    <label htmlFor="cedula" className="block">Cédula</label>
                    <input name="cedula" type="text" className="border px-2 py-1 w-full"/>
                </div>

                <div>
                    <label htmlFor="nombre" className="block">Nombre</label>
                    <input name="nombre" type="text" className="border px-2 py-1 w-full"/>
                </div>

                <div>
                    <label htmlFor="apellido" className="block">Apellido</label>
                    <input name="apellido" type="text" className="border px-2 py-1 w-full"/>
                </div>

                <div>
                    <label htmlFor="numero-camiseta" className="block">Número de camiseta</label>
                    <input name="numero-camiseta" type="text" className="border px-2 py-1 w-full"/>
                </div>

                <div>
                    <label htmlFor="carrera" className="block">Carrera</label>
                    <input name="carrera" type="text" className="border px-2 py-1 w-full"/>
                </div>

                <button className="bg-green-600 px-4 py-2 rounded text-white text-sm">Agregar Jugador</button>
                </form>
            </div>

        </div>

        </>
    )
}


export default RegisterPlayers