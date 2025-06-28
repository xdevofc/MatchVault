import type { Dispatch, SetStateAction } from "react";
import type { EventoFutbol, jugador } from "../../../../types/types";
import type {MutableRefObject} from 'react';

export interface useGuardarEventosProps {
    isFirstRender2: MutableRefObject<boolean>,
    eventos:EventoFutbol[],
    setEventos:Dispatch<SetStateAction<EventoFutbol[]>>,
    equipoA:jugador[],
    equipoB:jugador[],
}