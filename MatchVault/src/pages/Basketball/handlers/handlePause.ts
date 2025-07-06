import type { Dispatch, SetStateAction } from "react"

interface handlePauseProps  {
    setIsRunning : Dispatch<SetStateAction<boolean>>
}

function handlePause({
    setIsRunning
}:handlePauseProps){
    
    setIsRunning(false)
}

export default handlePause;