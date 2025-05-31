import type React from "react";
import { useEffect, useState } from "react";

function RegisterPlayers() : React.JSX.Element{

 
    const [nombreJugador, setNombreJugador] = useState("Nombre");
    const [apellido, setApellido] = useState("Apellido");
    const [cedula, setCedula] = useState("Cedula");
    const [nroCamiseta, setNroCamiseta] = useState(0);
    const [carrera, setCarrera] = useState("Nombre");



    const [jugadores, setJugadores] = useState<Array<{
        nombreJugador: string,
        apellido: string,
        cedula: string,
        nroCamiseta: number,
        carrera: string
    }>>([])


    function handleAgregarJugador(): void{

        const nuevoJugador = {
            nombreJugador,
            apellido,
            cedula,
            nroCamiseta,
            carrera
        }


        setJugadores(prev => [...prev, nuevoJugador])

    }

    useEffect( ()=> {
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
                <h2 className="text-lg font-semibold mb-2">Jugadores Agregados</h2>
                {/* ...Listado dinámico aquí... */}
            </div>

            <div className="bg-blue-100 p-4 rounded shadow border">
                {/* Aquí podrías poner otro contenido si es necesario */}
                <h2 className="text-lg font-semibold mb-2">Otra Sección</h2>
                {/* ...Contenido adicional aquí... */}
            </div>
            </div>
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
                <input name="cedula" type="text" className="border px-2 py-1 w-full"
                onChange={e => setCedula(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="nombre" className="block">Nombre</label>
                <input name="nombre" type="text" className="border px-2 py-1 w-full"
                onChange={e => setNombreJugador(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="apellido" className="block">Apellido</label>
                <input name="apellido" type="text" className="border px-2 py-1 w-full"
                onChange={e => setApellido(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="numero-camiseta" className="block">Número de camiseta</label>
                <input name="numero-camiseta" type="text" className="border px-2 py-1 w-full"
                onChange={e => setNroCamiseta(parseInt(e.target.value))}/>
            </div>

            <div>
                <label htmlFor="carrera" className="block">Carrera</label>
                <input name="carrera" type="text" className="border px-2 py-1 w-full"
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