import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

interface PenalesPopupProps {
  onClose: () => void;
  setShowWinner: Dispatch<SetStateAction<boolean>>;
}

const TandaPenalties: React.FC<PenalesPopupProps> = ({ onClose, setShowWinner }) => {
  const { nombreA, nombreB, setNombreA, setNombreB, setScoreA, setScoreB } = useDatosDelPartidoContext();

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [penales1, setPenales1] = useState<boolean[]>([]);
  const [penales2, setPenales2] = useState<boolean[]>([]);
  const [showGoles, setShowGoles] = useState(true);
  const [turnoEquipo1, setTurnoEquipo1] = useState(true);
  const maxTirosReglamentarios = 5;

  //const diferencia = Math.abs(score1 - score2);
  const ambosTiraronLoMismo = penales1.length === penales2.length;
  const enReglamentarios = penales1.length < maxTirosReglamentarios || penales2.length < maxTirosReglamentarios;
  const enMuerteSubita = penales1.length >= maxTirosReglamentarios && penales2.length >= maxTirosReglamentarios;

  // ✅ Lógica para determinar si ya hay un ganador
  useEffect(() => {
    // En ronda reglamentaria: gana si ya no puede ser alcanzado
    if (enReglamentarios) {
      const restantes1 = maxTirosReglamentarios - penales1.length;
      const restantes2 = maxTirosReglamentarios - penales2.length;

      if (score1 > score2 + restantes2 || score2 > score1 + restantes1) {
        finalizar();
      }
    }

    // En muerte súbita: gana si uno anota y el otro no, y ambos ya tiraron ese turno
    if (enMuerteSubita && ambosTiraronLoMismo) {
      const ultimo1 = penales1[penales1.length - 1];
      const ultimo2 = penales2[penales2.length - 1];

      if (ultimo1 !== undefined && ultimo2 !== undefined && ultimo1 !== ultimo2) {
        finalizar();
      }
    }
  }, [penales1, penales2]);

  const finalizar = () => {
    setShowWinner(true);
    setShowGoles(false);
    setScoreA(prev => prev + score1);
    setScoreB(prev => prev + score2);
    onClose();
  };

  // Al marcar un penal
  const marcarPenal = (anotado: boolean) => {
    if (turnoEquipo1) {
      setPenales1(prev => [...prev, anotado]);
      if (anotado) setScore1(prev => prev + 1);
    } else {
      setPenales2(prev => [...prev, anotado]);
      if (anotado) setScore2(prev => prev + 1);
    }
    setTurnoEquipo1(!turnoEquipo1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-black">
        <h2 className="text-2xl font-bold text-center mb-4">Tanda de Penales</h2>

        <div className="flex justify-between mb-4">
          <input
            className="border px-2 py-1 rounded w-1/2 mr-2"
            value={nombreA}
            onChange={e => setNombreA(e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded w-1/2"
            value={nombreB}
            onChange={e => setNombreB(e.target.value)}
          />
        </div>

        <div className="flex justify-between mb-4 text-lg font-semibold">
          <span>{nombreA}: {score1}</span>
          <span>{nombreB}: {score2}</span>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">{nombreA}</p>
          <div className="flex gap-2 mb-2">
            {penales1.map((ok, i) => (
              <span key={i} className={`w-4 h-4 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`}></span>
            ))}
          </div>
          <p className="text-sm font-semibold mb-1">{nombreB}</p>
          <div className="flex gap-2">
            {penales2.map((ok, i) => (
              <span key={i} className={`w-4 h-4 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`}></span>
            ))}
          </div>
        </div>

        {showGoles && (
          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">Turno de: {turnoEquipo1 ? nombreA : nombreB}</p>
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
