import type { PropsTimerButtons } from "../../../interfaces/interfaces";
import { iconoEvento } from "../../../types/types";
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";





const TimerButtons : React.FC<PropsTimerButtons> = ({
    isPaused,
    setMinutos,
    setIsPaused,
    setSeconds,
    eventos
}) => {

    const { duracion } = useDatosDelPartidoContext()
    return (
        <div className="flex flex-col items-center justify-center space-y-4 text-[#EAEAEA]">
  <div className="flex items-center space-x-2">
    <button className="px-3 py-1 bg-[#333] hover:bg-[#444] text-white rounded shadow" onClick={() => setIsPaused(!isPaused)}>
      {isPaused ? "Continuar" : "Pausar"}
    </button>
    <button className="px-3 py-1 bg-[#333] hover:bg-[#444] text-white rounded shadow" onClick={() => setMinutos(prev => prev + 1)}>+1 min</button>
    <button className="px-3 py-1 bg-[#333] hover:bg-[#444] text-white rounded shadow" onClick={() => setMinutos(prev => prev - 1)}>-1 min</button>
    <button className="px-3 py-1 bg-[#550000] hover:bg-[#770000] text-white rounded shadow" onClick={() => {
      setMinutos(duracion - 1);
      setSeconds(59);
    }}>Reset</button>
  </div>

  <div className="flex flex-col space-y-1 text-sm text-gray-400 max-h-[10rem] overflow-y-auto">
    {eventos && eventos.length > 0 ? (
      eventos.map((e, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <span>{iconoEvento[e.tipo]}</span>
          <span className="font-medium">{e.minuto}'</span>
          <span>{e.jugador}</span>
        </div>
      ))
    ) : (
      <span className="italic text-[#555]">Sin eventos</span>
    )}
  </div>
</div>

    )
}

export default TimerButtons