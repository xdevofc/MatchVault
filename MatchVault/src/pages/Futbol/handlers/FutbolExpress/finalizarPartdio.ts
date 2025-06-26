export function finalizarPartido(confirmacion : boolean){

    if (confirmacion){
        localStorage.removeItem('Lista-jugadores')
        localStorage.removeItem('futbol-datos-partido')
        localStorage.removeItem('futbol-eventos')
        localStorage.removeItem('futbol-configuracion-partido')

    }
    
    // liberando lo que habia en el local storage 
    

}
