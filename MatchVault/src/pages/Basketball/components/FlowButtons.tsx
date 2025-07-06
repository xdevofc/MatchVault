import type { Dispatch, SetStateAction } from "react";
import handleFinish from "../handlers/handleFinish";
import handlePause from "../handlers/handlePause";
import handleStart from "../handlers/handleStart";



interface FlowButtonsProps {
    isRunning: boolean,
    isFinished: boolean,
    setIsRunning: Dispatch<SetStateAction<boolean>>,
    setIsFinished: Dispatch<SetStateAction<boolean>>,
}


const FlowButtons = ({
    isRunning,
    isFinished,
    setIsFinished,
    setIsRunning
}: FlowButtonsProps) =>{
    return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
        {!isRunning && !isFinished && (
          <button onClick={() => {
            handleStart({setIsRunning})
          }} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={() => {
            handlePause({setIsRunning})
          }} className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded">
            Pause
          </button>
        )}
        {!isFinished && (
          <button onClick={() =>{
            handleFinish({setIsFinished, setIsRunning})
          }} className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded">
            Finish
          </button>
        )}
      </div>
    )
}

export default FlowButtons;