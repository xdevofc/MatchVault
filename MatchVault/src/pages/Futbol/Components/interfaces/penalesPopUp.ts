import type { Dispatch } from "react";

export interface PenalesPopupProps {
  onClose: () => void;
  setShowWinner: Dispatch<React.SetStateAction<boolean>>;
}
