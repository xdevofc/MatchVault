import type React from "react";

function ConfiguracionPartido(): React.JSX.Element{
    return (
        <>
             <label>
                Amonestaciones
                <input type="checkbox"/>
                <span className='slider round'></span>
            </label><br></br>

            <label htmlFor="montoAmarilla">Monto por tarjeta Amarilla</label>
            <input name="montoAmarilla" type="text"/><br></br>

            <label htmlFor="montoRoja">Monto por tarjeta Roja</label>
            <input name="montoRoja" type="text"/><br></br>

            <label htmlFor="duration">Duracion del Partido</label>
            <input name="duration" type="text"/><br></br>


             <label>
               Penalties 
                <input type="checkbox"/>
                <span className='slider round'></span>
            </label><br></br>

             <label>
               Faltas acumuladas 
                <input type="checkbox"/>
                <span className='slider round'></span>
            </label><br></br>
            
        </>
    )
}

export default ConfiguracionPartido