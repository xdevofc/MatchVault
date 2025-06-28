import type { Dispatch, SetStateAction } from "react";

export interface prorrogaProps {
    cantTiempoAgg: number,
    setCantidadTiempoAgg: Dispatch<SetStateAction<number>>,
    setTableroMinutos:Dispatch<SetStateAction<number>>,
    setShowExtraTime:Dispatch<SetStateAction<boolean>>
}