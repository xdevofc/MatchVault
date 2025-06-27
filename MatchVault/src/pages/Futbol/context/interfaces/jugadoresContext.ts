import type { Dispatch, SetStateAction } from "react";
import type { jugador } from "../../../../types/types";

export interface JugadoresContextType {
    setEquipoA: Dispatch<SetStateAction<jugador[]>>;
    setEquipoB: Dispatch<SetStateAction<jugador[]>>;
    equipoA: jugador[];
    equipoB: jugador[];
    
}