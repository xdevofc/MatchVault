import type { Dispatch } from "react";

 export function handlePenalties(
    penalties: boolean,
    setPenalties: Dispatch<React.SetStateAction<boolean>>
  ) : void {
    setPenalties(!penalties)
  }
