

// creamos la interface para declarar los tipos luego 

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

interface DatosDelPartido {
    duracion: number,
    amonestaciones: boolean,
    montoAmarilla: number,
    montoRoja: number,
    penalties:boolean,
    prorroga: boolean,
    setDuracion: Dispatch<SetStateAction<number>>,
    setAmonestaciones: Dispatch<SetStateAction<boolean>>,
    setMontoAmarilla: Dispatch<SetStateAction<number>>,
    setMontoRoja: Dispatch<SetStateAction<number>>,
    setPenalties: Dispatch<SetStateAction<boolean>>,
    setProrroga: Dispatch<SetStateAction<boolean>>,
}


export const DatosPartidoContext = createContext<undefined| DatosDelPartido>(undefined)


export function useDatosDelPartidoContext(){

    const datosPartido = useContext(DatosPartidoContext)

    if (datosPartido === undefined){
        throw new Error("Error en el provider de Datos del partido")
    }

    return datosPartido

}