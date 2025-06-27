

// creamos la interface para declarar los tipos luego 
import { createContext, useContext, } from 'react';
import type { DatosDelPartido } from './interfaces/datosDelPartidoContext';



export const DatosPartidoContext = createContext<undefined | DatosDelPartido>(undefined)


export function useDatosDelPartidoContext() {

    const datosPartido = useContext(DatosPartidoContext)

    if (datosPartido === undefined) {
        throw new Error("Error en el provider de Datos del partido")
    }

    return datosPartido

}
