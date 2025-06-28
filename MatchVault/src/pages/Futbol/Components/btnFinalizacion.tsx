import { finalizarPartido } from "../handlers/FutbolExpress/finalizarPartdio";
import type { btnFinalizacionProps } from "./interfaces/btnFinalizacion";



const BotonesFinalizacion: React.FC<btnFinalizacionProps> = ({
    navigate,
    setShowExport
}) =>{
    return (

         <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
              onClick={(e) => {
                e.preventDefault();
                const allowDelete = confirm("Desea terminar el partido ? su progreso NO se guardara");
                finalizarPartido(allowDelete);
                if (allowDelete) navigate('/');
              }}
            >
              Finalizar Partido
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowExport(true);
              }}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#BFA434] text-[#121212] rounded shadow"
            >
              Exportar Partido
            </button>
          </div>
    )
}

export default BotonesFinalizacion;