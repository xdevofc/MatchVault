import type { Dispatch } from "react";

 export function handleProrroga(
    prorroga: boolean,
    setProrroga: Dispatch<React.SetStateAction<boolean>>
  ) : void{
    setProrroga(!prorroga)
  }