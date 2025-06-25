import type { Dispatch, ChangeEvent } from "react";
import type { jugador } from "../../../../types/types";



  
  export function handleAmonestaciones(
    amonestaciones: boolean,
    setAmonestaciones: Dispatch<React.SetStateAction<boolean>>
  ) : void{
    setAmonestaciones(!amonestaciones)
  }

  export function handlePenalties(
    penalties: boolean,
    setPenalties: Dispatch<React.SetStateAction<boolean>>
  ) : void {
    setPenalties(!penalties)
  }

  export function handleProrroga(
    prorroga: boolean,
    setProrroga: Dispatch<React.SetStateAction<boolean>>
  ) : void{
    setProrroga(!prorroga)
  }


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
    ){
    const jsonText = JSON.parse(text)

    // extraemos data del json
    const {equipoA, equipoB, duracion, penalties, prorroga, montoAmarilla, montoRoja, amonestaciones} = jsonText

    if ( equipoA === undefined ||
        equipoB === undefined ||
        duracion === undefined ||
        penalties === undefined || 
        prorroga === undefined || 
        montoAmarilla === undefined || 
        montoRoja === undefined || 
        amonestaciones === undefined
    ){
        throw new Error("Formato no adecuado")
    }

    setDuracion(duracion)
    setAmonestaciones(amonestaciones)
    setMontoAmarilla(montoAmarilla)
    setMontoRoja(montoRoja)
    setPenalties(penalties)
    setProrroga(prorroga)
    setEquipoA(equipoA)
    setEquipoB(equipoB)
    

  }