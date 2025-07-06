import type { Dispatch, SetStateAction } from "react";

interface handleFinishProps {
    setIsFinished : Dispatch<SetStateAction<boolean>>
    setIsRunning: Dispatch<SetStateAction<boolean>>
}

function handleFinish({
    setIsFinished,
    setIsRunning
}: handleFinishProps){
    setIsFinished(true)
    setIsRunning(false)
}

export default handleFinish