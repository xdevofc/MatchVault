import { useEffect } from "react"
import type { GuardarPartidosProps } from "./interface/useGuardarConfiguracionPartido"

export function useGuardarConfigPartido({setTableroMinutos, setTableroSegundos, isFirstRender3, duracion} : GuardarPartidosProps) {


    
      useEffect(() => {
    
        if (isFirstRender3.current) {
    
          const dataPartidoTranscurrido = localStorage.getItem('futbol-datos-partido')
    
    
          if (dataPartidoTranscurrido) {
            console.log("DATOS DEL PARTIDO IMPORTADO", dataPartidoTranscurrido)
    
    
    
            //verificamos las propiedades de futbol-config-partido
            if (!JSON.parse(dataPartidoTranscurrido).minutosJugados || !JSON.parse(dataPartidoTranscurrido).segundosJugados ||
              !JSON.parse(dataPartidoTranscurrido).scoreA || !JSON.parse(dataPartidoTranscurrido).scoreB) {
              setTableroMinutos(duracion)
            }
            else {
              const { minutosJugados, segundosJugados } = JSON.parse(dataPartidoTranscurrido)
              setTableroMinutos(minutosJugados)
              setTableroSegundos(segundosJugados)
            }
          }
    
        } else {
          return
        }
    
      }, [])
    
    
    


}