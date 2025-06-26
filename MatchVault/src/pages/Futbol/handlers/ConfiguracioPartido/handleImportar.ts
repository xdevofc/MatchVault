import type { ChangeEvent, Dispatch } from "react";
import type { jugador } from "../../../../types/types";
import { guardarEventos } from "../FutbolExpress/guardarPilaEventos";

 export function handleImportar(
    event: ChangeEvent<HTMLInputElement>,
    setMostrarPopUp: Dispatch<React.SetStateAction<boolean>>,
    setDuracion: Dispatch<React.SetStateAction<number>>,
    setAmonestaciones: Dispatch<React.SetStateAction<boolean>>,
    setMontoAmarilla: Dispatch<React.SetStateAction<number>>,
    setMontoRoja: Dispatch<React.SetStateAction<number>>,
    setPenalties: Dispatch<React.SetStateAction<boolean>>,
    setProrroga: Dispatch<React.SetStateAction<boolean>>,
    setEquipoA: Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: Dispatch<React.SetStateAction<jugador[]>>,
    setNombreEquipoA: Dispatch<React.SetStateAction<string>>,
    setNombreEquipoB: Dispatch<React.SetStateAction<string>>,
    setScoreA: Dispatch<React.SetStateAction<number>>,
    setScoreB: Dispatch<React.SetStateAction<number>>,
    
  
){


    // consiguiendo el archivo
    const archivo =  event.target.files?.[0]

    if (!archivo){
        throw new Error("Error en la importacion del archivo")
    }

    // creamos un nuevo lector 
    const reader = new FileReader();

    reader.onload = async (e) => {
        const text = e.target?.result

        if (text === null || text === undefined){
            throw new Error("No exite nada que convertir ")
        }

        if (typeof text === 'string'){

            try {
                //tratamos de convertirlo en json 
                handleImportedData(text, 
                    setDuracion,
                    setAmonestaciones,
                    setMontoAmarilla, 
                    setMontoRoja, 
                    setPenalties, 
                    setProrroga, 
                    setEquipoA, 
                    setEquipoB,
                    setNombreEquipoA,
                    setNombreEquipoB,
                    setScoreA,
                    setScoreB,
                )
            }catch(error){
                console.error("no se pudo convertir en json: ",error)
            }

        }
        
       
    }


    reader.readAsText(archivo)

    setMostrarPopUp(false)
  }


   function handleImportedData(
    text : string,
    setDuracion: Dispatch<React.SetStateAction<number>>,
    setAmonestaciones: Dispatch<React.SetStateAction<boolean>>,
    setMontoAmarilla: Dispatch<React.SetStateAction<number>>,
    setMontoRoja: Dispatch<React.SetStateAction<number>>,
    setPenalties: Dispatch<React.SetStateAction<boolean>>,
    setProrroga: Dispatch<React.SetStateAction<boolean>>,
    setEquipoA: Dispatch<React.SetStateAction<jugador[]>>,
    setEquipoB: Dispatch<React.SetStateAction<jugador[]>>,
    setNombreEquipoA: Dispatch<React.SetStateAction<string>>,
    setNombreEquipoB: Dispatch<React.SetStateAction<string>>,
    setScoreA: Dispatch<React.SetStateAction<number>>,
    setScoreB: Dispatch<React.SetStateAction<number>>,

    ){
    const jsonText = JSON.parse(text)

    // extraemos data del json
    const {equipoA, 
      equipoB, 
      duracionInicial, 
      penalties, 
      prorroga, 
      montoAmarilla, 
      montoRoja, 
      amonestaciones,
      eventos,
      nombreEquipoA,
      nombreEquipoB,
      minutosJugados,
      segundosJugados,
      scoreA,
      scoreB
    } = jsonText

    if ( equipoA === undefined ||
        equipoB === undefined ||
        duracionInicial === undefined ||
        penalties === undefined || 
        prorroga === undefined || 
        montoAmarilla === undefined || 
        montoRoja === undefined || 
        amonestaciones === undefined||
        eventos === undefined
    ){
        throw new Error("Formato no adecuado")
    }

    setAmonestaciones(amonestaciones)
    setMontoAmarilla(montoAmarilla)
    setMontoRoja(montoRoja)
    setPenalties(penalties)
    setProrroga(prorroga)
    setEquipoA(equipoA)
    setEquipoB(equipoB)   
    setNombreEquipoA(nombreEquipoA) 
    setNombreEquipoB(nombreEquipoB) 
    guardarEventos(eventos)
    setScoreA(scoreA)
    setScoreB(scoreB)
    setDuracion(duracionInicial)

    // guardando en el local storage los datos del partido TRANSCURRIDO
    localStorage.setItem('futbol-datos-partido',JSON.stringify(
      {
      minutosJugados: minutosJugados,
      segundosJugados: segundosJugados,
      scoreA,
      scoreB
    }))

      
    
  }