import { createContext, useContext} from "react";
import type { JugadoresContextType } from "./interfaces/jugadoresContext";

// creamos una interface para las funciones que debemos pasar 



export const JugadoresContext = createContext<JugadoresContextType | undefined>(undefined);


export function useJugadoresContext(){

    const jugadoresHelpers = useContext(JugadoresContext);

    if (!jugadoresHelpers){
        throw new Error("Error en el provider")
    }

    return jugadoresHelpers
}
