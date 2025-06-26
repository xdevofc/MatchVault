export function handleSuplente(
    titular:boolean,
    setTitular:React.Dispatch<React.SetStateAction<boolean>>,
    ) : void{
    setTitular(!titular)
}