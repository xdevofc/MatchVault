import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";


import React, { useState, useEffect } from 'react';

interface PenalesPopupProps{
  onClose: () => void;
}

const TandaPenalties: React.FC<PenalesPopupProps> = ({ onClose }) => {


    const {nombreA,nombreB, scoreA,scoreB} = useDatosDelPartidoContext()

  const [equipo1, setEquipo1] = useState(nombreA);
  const [equipo2, setEquipo2] = useState(nombreB);

  const [score1, setScore1] = useState(scoreA);
  const [score2, setScore2] = useState(scoreB);

  const [penales1, setPenales1] = useState<boolean[]>([]);
  const [penales2, setPenales2] = useState<boolean[]>([]);

  const [turnoEquipo1, setTurnoEquipo1] = useState(true);

  const [showWinnerPenalties, setShowWinnerPenalties] = useState(false)
  const [winnerPenalties, setWinnerPenalties] = useState<string>("")
  const MAX_PENALES = 5;

  // Al marcar un penal
  const marcarPenal = (anotado: boolean) => {
    if (turnoEquipo1) {
      setPenales1([...penales1, anotado]);
      if (anotado) setScore1(score1 + 1);
    } else {
      setPenales2([...penales2, anotado]);
      if (anotado) setScore2(score2 + 1);
    }
    setTurnoEquipo1(!turnoEquipo1);
  };

  useEffect(() => {
    const diferencia = Math.abs(score1 - score2);

    if (diferencia > 2 ){
        
        if(Math.max(score1,score2) === score1){
            setWinnerPenalties(nombreA)
        }else{
            setWinnerPenalties(nombreB)
        }
    }

    const penalesRestantes1 = MAX_PENALES - penales1.length;
    const penalesRestantes2 = MAX_PENALES - penales2.length;

    if (
      penales1.length <= MAX_PENALES &&
      penales2.length <= MAX_PENALES &&
      (
        (score1 > score2 + penalesRestantes2) ||
        (score2 > score1 + penalesRestantes1)
      )
    ) {
      alert("¡Ya hay un ganador!");
    }

  }, [penales1, penales2]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-black">
        <h2 className="text-2xl font-bold text-center mb-4">Tanda de Penales</h2>

        <div className="flex justify-between mb-4">
          <input
            className="border px-2 py-1 rounded w-1/2 mr-2"
            value={equipo1}
            onChange={e => setEquipo1(e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded w-1/2"
            value={equipo2}
            onChange={e => setEquipo2(e.target.value)}
          />
        </div>

        <div className="flex justify-between mb-4 text-lg font-semibold">
          <span>{equipo1}: {score1}</span>
          <span>{equipo2}: {score2}</span>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">{equipo1}</p>
          <div className="flex gap-2 mb-2">
            {penales1.map((ok, i) => (
              <span key={i} className={`w-4 h-4 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`}></span>
            ))}
          </div>
          <p className="text-sm font-semibold mb-1">{equipo2}</p>
          <div className="flex gap-2">
            {penales2.map((ok, i) => (
              <span key={i} className={`w-4 h-4 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`}></span>
            ))}
          </div>
        </div>

        {(penales1.length < MAX_PENALES || penales2.length < MAX_PENALES) && (
          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">Turno de: {turnoEquipo1 ? equipo1 : equipo2}</p>
            <div className="flex gap-4">
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                onClick={() => marcarPenal(true)}
              >
                Gol
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={() => marcarPenal(false)}
              >
                Falló
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-6 text-sm text-gray-600 underline"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TandaPenalties;
