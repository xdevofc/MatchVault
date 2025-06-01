import type React from "react";
import { useEffect, useState } from "react";
import type { definirEquipos } from '../../types/types';

/*
TODO: AGREGAR REACT CONTEXT
TODO: Switches, activar y desactivar opciones
TODO: Pagina de not found 
*/ 


function RegisterPlayers({nombreEquipo, onSubmit, jugadores }:definirEquipos) : React.JSX.Element {
 
    const [nombreJugador, setNombreJugador] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [nroCamiseta, setNroCamiseta] = useState<string | number>("");
    const [carrera, setCarrera] = useState("");

    // Agregando jugadores a sus listas
    function handleAgregarJugador() :void {

        onSubmit({
            nombre: nombreJugador,
            apellido,
            cedula,
            nroCamiseta,
            carrera
        })

        // Limpiando los campos

        setNombreJugador("")
        setApellido("")
        setNroCamiseta("")
        setCarrera("")
        setCedula("")
    }

    // Imprimiendo para pruebas
    useEffect(()=>{
        console.log("imprimiendo jugadores")
        console.log(jugadores)
    },[jugadores])

    return (
        <>
        <div className="grid grid-cols-2 gap-4 p-4"> 
            {/* Div del Listado de agregados */}
            <div className="bg-gray-100 p-4 rounded shadow border">
                {/* Aquí iría el listado de jugadores agregados */}
                <div className="grid grid-rows-2 grid-cols-1 gap-4">
                <div className="bg-gray-100 p-4 rounded shadow border">
                    {/* Aquí iría el listado de jugadores agregados */}
                    <h2 className="text-lg font-semibold mb-2">Titulares</h2>
                    {/* ...Listado dinámico aquí... */}
                    { jugadores.map(player => <p key={player.cedula}>{player.nombre}</p>)}
                </div>

                <div className="bg-blue-100 p-4 rounded shadow border">
                    {/* Aquí podrías poner otro contenido si es necesario */}
                    <h2 className="text-lg font-semibold mb-2">Suplentes</h2>
                    {/* ...Contenido adicional aquí... */}
                </div>
                </div>
            </div>

            {/* Div del Form */}
            <div className="bg-white p-4 rounded shadow border">
                <h2 className="text-lg font-semibold mb-2">{nombreEquipo}</h2>
                <form className="space-y-3">
                
                <div>
                    <label htmlFor="cedula" className="block">Cédula</label>
                    <input name="cedula" type="text" className="border px-2 py-1 w-full"
                    value={cedula}
                    onChange={e => setCedula(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="nombre" className="block">Nombre</label>
                    <input name="nombre" type="text" className="border px-2 py-1 w-full"
                    value={nombreJugador}
                    onChange={e => setNombreJugador(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="apellido" className="block">Apellido</label>
                    <input name="apellido" type="text" className="border px-2 py-1 w-full"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="numero-camiseta" className="block">Número de camiseta</label>
                    <input name="numero-camiseta" type="text" className="border px-2 py-1 w-full"
                    value={nroCamiseta}
                    onChange={e => setNroCamiseta(parseInt(e.target.value))}/>
                </div>

                <div>
                    <label htmlFor="carrera" className="block">Carrera</label>
                    <input name="carrera" type="text" className="border px-2 py-1 w-full"
                    value={carrera}
                    onChange={e => setCarrera(e.target.value)}/>
                </div>

                <button className="bg-green-600 px-4 py-2 rounded text-white text-sm" 
                onClick={e => {
                    e.preventDefault()
                    handleAgregarJugador()
                    
                }}>Agregar Jugador</button>
                </form>
            </div>

        </div>

        </>
    )
}


export default RegisterPlayers