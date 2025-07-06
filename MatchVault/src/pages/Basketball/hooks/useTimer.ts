import { useEffect, type Dispatch, type SetStateAction } from "react";

interface useTimerProps {
    isRunning: boolean,
    isFinished: boolean,
    setIsRunning: Dispatch<SetStateAction<boolean>>
    setTimeLeft: Dispatch<SetStateAction<number>>
    setIsFinished: Dispatch<SetStateAction<boolean>>
}


function useTimer({
    isRunning,
    isFinished,
    setIsRunning,
    setTimeLeft,
    setIsFinished
}: useTimerProps){

    useEffect(() => {
    if (!isRunning || isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isFinished]);

}


export default useTimer