import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";


export interface btnFinalizacionProps {
    navigate: NavigateFunction,
    setShowExport: Dispatch<SetStateAction<boolean>> 
}