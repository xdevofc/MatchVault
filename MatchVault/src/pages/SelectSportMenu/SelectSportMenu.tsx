import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectSportMenu(): React.JSX.Element {

    // creando un handler para pasar los datos necesarios
    const [modalidad, setModalidad] = useState('Express')
    const [deporte, setDeporte] = useState('Futbol')
    const navigate = useNavigate()
    // creando un handler para el navigate

    function handleRedirect(){
        navigate(`/${modalidad}-${deporte}-config`)
    }

    return (
        <>
            <h1>Bienvenidos a MatchVault</h1>
            <h2>Elige un deporte para comenzar</h2>
            <form>

                {/* DropDown de la modalidad */}
                <label htmlFor="modalidad">Eliga una modalidad</label>
                <select name="modalidad" 
                    id="select-modalidad"
                    value={modalidad}
                    onChange={e=> setModalidad(e.target.value)}
                >
                    <option value="Express">Express</option>
                    <option value="Torneo">Torneo</option>
                </select>
                
                {/* DropDown de deportes */}
                <label htmlFor="Deportes">Eliga el deporte</label>
                <select name="Deportes"
                    id="select-deporte"
                    value={deporte}
                    onChange={e => setDeporte(e.target.value)}
                >
                    <option value="Futbol">Futbol</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Ping-Pong">Ping Pong</option>
                    <option value="Volleyball">Volleyball</option>
                </select>

                <button onClick={handleRedirect}>Enviar</button>
            </form>
        </>
    )
}

export default SelectSportMenu;