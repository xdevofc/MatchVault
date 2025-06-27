import { useEffect } from "react"
import { type useGuardarDatosPartidosProps } from './interface/useGuardarDatosPartido';



export function useGuardarDatosPartido({isPastFirstRender,
    tableroMinutos,
    tableroSegundos,
    scoreA,
    scoreB,
    setIsTie
}: useGuardarDatosPartidosProps){



      // guardar los datos del partido
      useEffect(() => {
    
        // traemos los datos del LS si los hay 
    
        if (isPastFirstRender.current) {
          console.log("GUARDAMOS FUTBOL-DATOS-PARTIDO AL TRANSCURRIR TIEMPO ")
    
    
          localStorage.setItem('futbol-datos-partido', JSON.stringify({
            minutosJugados: tableroMinutos,
            segundosJugados: tableroSegundos,
            scoreA,
            scoreB,
          }))
        }
    
        if (scoreA === scoreB) {
          setIsTie(true)
        } else {
          setIsTie(false)
        }
    
    
        isPastFirstRender.current = true
    
    
      }, [tableroSegundos, tableroMinutos, scoreA, scoreB])
    


}