import { useEffect } from "react";
import { type useFlujoPartidoProps } from './interface/useFlujoPartidoProps';



export function useFlujoPartido({

    isPaused,
    tableroSegundos,
    tableroMinutos,
    setTableroSegundos,
    setTableroMinutos,
    setIsPaused,
    setShowExtraTime,
    prorroga,
    setProrroga,
    isTie,
    penalties,
    setShowPenalties,
    afterExtraTime,
    setAfterExtraTime,



}:useFlujoPartidoProps){



      // actualizar los segundos del minutero
      useEffect(() => {
        let interval: number | undefined;
    
        if (!isPaused && (tableroMinutos > 0 || tableroSegundos > 0)) {
          interval = window.setInterval(() => {
            setTableroSegundos((prevSegundos: number) => {
              if (prevSegundos > 0) {
                return prevSegundos - 1;
              } else {
                return 59;
              }
            });
    
            setTableroMinutos((prevMinutos: number) => {
              if (tableroSegundos === 0) {
                return prevMinutos > 0 ? prevMinutos - 1 : 0;
              }
              return prevMinutos;
            });
          }, 1000);
        }
    
        if (!isPaused && tableroMinutos === 0 && tableroSegundos === 0) {
          // Evitamos que se ejecute múltiples veces
          clearInterval(interval);
          setIsPaused(true);
    
          if (prorroga && !afterExtraTime && isTie) {
            // Se activa la prórroga
            setShowExtraTime(true);
            setProrroga(false);
            setAfterExtraTime(true); // Marcamos que ya se usó la prórroga
            return;
          }
    
          if (penalties && (afterExtraTime || !prorroga) && isTie) {
            setShowPenalties(true);
            return;
          }
    
    
          // ✅ Solo se muestra el mensaje si NO hay prórroga ni penales pendientes
          if (!prorroga && !penalties && !afterExtraTime) {
            console.log("⏱ Se alcanzó 00:00, pausando reloj");
          }
        }
    
        return () => clearInterval(interval);
      }, [isPaused, tableroMinutos, tableroSegundos, prorroga, afterExtraTime, penalties]);
    


}