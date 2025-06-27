import type {Dispatch, SetStateAction} from 'react';
import type {MutableRefObject} from 'react';

export interface useGuardarDatosPartidosProps{
    isPastFirstRender: MutableRefObject<boolean>,
    tableroMinutos: number,
    tableroSegundos:number,
    scoreA:number,
    scoreB: number,
    setIsTie: Dispatch<SetStateAction<boolean>>
}