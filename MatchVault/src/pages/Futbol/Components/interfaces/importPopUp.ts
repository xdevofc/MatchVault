import type { Dispatch } from "react";

export interface PopUpProps {
  mostrarPopUp: boolean;
  setMostrarPopUp: Dispatch<React.SetStateAction<boolean>>;
}
