import type { PropsTimerButtons } from "../../../interfaces/interfaces";
import { iconoEvento } from "../../../types/types";





const TimerButtons : React.FC<PropsTimerButtons> = ({
    isPaused,
    setMinutos,
    setIsPaused,
    eventos
}) => {

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-white rounded shadow" onClick={() => setIsPaused(!isPaused)}>
                    {isPaused ? "Continuar" : "Pausar"}
                </button>
                <button className="px-3 py-1 bg-white rounded shadow" onClick={() => setMinutos(prev => prev +1)}>+1 min</button>
                <button className="px-3 py-1 bg-white rounded shadow" onClick={() => setMinutos(prev => prev-1)}>-1 min</button>
            </div>
        <div className="flex flex-col space-y-1 text-sm text-gray-700">
            {eventos && eventos.length > 0 ? (
                eventos.map((e, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                        <span>{iconoEvento[e.tipo]}</span>
                        <span className="font-medium">{e.minuto}'</span>
                        <span>{e.jugador}</span>
                    </div>))
                ) : (
                    <span className="text-gray-400 italic">Sin eventos</span>
                )}
        </div>

        </div>
    )
}

export default TimerButtons