import type { Dispatch, SetStateAction } from "react";

 
 interface switchPosessionProps {
    setPossession: Dispatch<SetStateAction<string>>
 }

 const switchPossession = ({
    setPossession
 }: switchPosessionProps) => {

    setPossession((prev) => (prev === "teamA" ? "teamB" : "teamA"));
  
};


  export default switchPossession;