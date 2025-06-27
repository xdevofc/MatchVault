import type { Dispatch } from "react";

export interface winnerProps {
  showWinner: boolean;
  setShowWinner: Dispatch<React.SetStateAction<boolean>>;
}
