import type { Dispatch, SetStateAction } from "react";

interface handleStartProps {
    setIsRunning: Dispatch<SetStateAction<boolean>>
}

function handleStart ({
    setIsRunning
}: handleStartProps){
  setIsRunning(true)   
}


export default handleStart;