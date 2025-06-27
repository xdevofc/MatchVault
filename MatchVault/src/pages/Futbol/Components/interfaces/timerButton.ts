import type { Dispatch } from "react"
import type { EventoFutbol } from "../../../../types/types"

export interface PropsTimerButtons {
    isPaused: boolean,
    setMinutos: Dispatch<React.SetStateAction<number>>
    setIsPaused: Dispatch<React.SetStateAction<boolean>>
    eventos: EventoFutbol[]
    setSeconds: Dispatch<React.SetStateAction<number>>

}
