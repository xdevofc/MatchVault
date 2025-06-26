import type { Dispatch, SetStateAction } from "react";
import { useDatosDelPartidoContext } from "../context/DatosDelPartidoContext";

interface winnerProps {
  showWinner: boolean;
  setShowWinner: Dispatch<SetStateAction<boolean>>;
}

const Winner: React.FC<winnerProps> = ({ showWinner, setShowWinner }) => {
  const { scoreA, scoreB, nombreA, nombreB } = useDatosDelPartidoContext();

  return (
    <>
      {showWinner && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-neutral-900 text-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 space-y-6 border border-gray-700">
            <h2 className="text-2xl font-semibold tracking-wide text-center text-white">
              ¡Resultado final!
            </h2>

            <p className="text-lg text-center text-gray-300">
              {nombreA} <span className="font-bold text-white">{scoreA}</span> -{" "}
              <span className="font-bold text-white">{scoreB}</span> {nombreB}
            </p>

            <div className="flex justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowWinner(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Winner;
