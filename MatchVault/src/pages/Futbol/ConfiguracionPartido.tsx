import type React from "react";

function ConfiguracionPartido(): React.JSX.Element{
    return (
        <>
        <div className="grid grid-cols-3 gap-4 p-4">
        {/* Columna 1 */}
        <div className=" p-4 rounded shadow border flex flex-col space-y-4">
            <div>
            <label className="flex items-center space-x-2">
                <span className="font-semibold">Amonestaciones</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
                </label>
            </label>
            </div>

            <div>
            <label htmlFor="montoAmarilla" className="block text-sm">Monto por tarjeta Amarilla</label>
            <input name="montoAmarilla" type="text" className="border px-2 py-1 w-full rounded" />
            </div>

            <div>
            <label htmlFor="montoRoja" className="block text-sm">Monto por tarjeta Roja</label>
            <input name="montoRoja" type="text" className="border px-2 py-1 w-full rounded" />
            </div>
        </div>

        {/* Columna 2 */}
        <div className="p-4 rounded shadow border flex flex-col space-y-4">
            <div>
            <label htmlFor="duration" className="block text-sm">Duración del Partido</label>
            <input name="duration" type="text" className="border px-2 py-1 w-full rounded" />
            </div>

            <div className="flex justify-between items-center">
            <span className="text-sm">Penalties</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
            </label>
            </div>

            <div className="flex justify-between items-center">
            <span className="text-sm">Prorroga</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
            </label>
            </div>
        </div>

        {/* Columna 3 */}
        <div className="rounded shadow border flex flex-col justify-center space-y-4">
            <div className="flex gap-2">
            <button className="w-1/2 bg-blue-600 text-white py-2 rounded text-sm">Importar</button>
            <button className="w-1/2 bg-green-600 text-white py-2 rounded text-sm">Empezar partido</button>
            </div>
        </div>
    </div>
        
        </>
    )
}

export default ConfiguracionPartido