import type { Dispatch, SetStateAction, MutableRefObject } from 'react';

export interface GuardarPartidosProps {
  setTableroMinutos: Dispatch<SetStateAction<number>>;
  setTableroSegundos: Dispatch<SetStateAction<number>>;
  isFirstRender3: MutableRefObject<boolean>; // si tu useRef inicializa con useRef(true)
  duracion: number;
}
