import type { prorrogaProps } from "./interfaces/prorroga"



 const  Prorroga: React.FC<prorrogaProps> = ({
    cantTiempoAgg,
    setCantidadTiempoAgg,
    setTableroMinutos,
    setShowExtraTime
}) => {

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md text-center space-y-6 p-6">
                <h2 className="text-xl text-black font-semibold">Ingresa el tiempo extra!</h2>
                <label htmlFor="nombre" className="block text-lg font-medium text-black">Minutos</label>
                <input
                  name="nombre"
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                  value={cantTiempoAgg}
                  onChange={e => setCantidadTiempoAgg(Number(e.target.value))}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setTableroMinutos(cantTiempoAgg)
                    setShowExtraTime(false)
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded mt-4"
                >
                  Ir a la prorroga
                </button>
              </div>
            </div>
    )
}


export default Prorroga