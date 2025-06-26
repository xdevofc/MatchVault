import type { Dispatch } from "react";

 export function handleAmonestaciones(
    amonestaciones: boolean,
    setAmonestaciones: Dispatch<React.SetStateAction<boolean>>
  ) : void{
    setAmonestaciones(!amonestaciones)
  }