import { createContext, useContext, type Dispatch ,type SetStateAction } from "react";
import type { jugador } from "../../../types/types";

// creamos una interface para las funciones que debemos pasar 

interface JugadoresContextType {
    setEquipoA: Dispatch<SetStateAction<jugador[]>>;
    setEquipoB: Dispatch<SetStateAction<jugador[]>>;
    equipoA: jugador[];
    equipoB: jugador[];
}

export const JugadoresContext = createContext<JugadoresContextType | undefined>(undefined);


export function useJugadoresContext(){

    const jugadoresHelpers = useContext(JugadoresContext);

    if (!jugadoresHelpers){
        throw new Error("Error en el provider")
    }

    return jugadoresHelpers
}
