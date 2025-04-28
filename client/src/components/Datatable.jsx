function Datatable({ DataTop, Data, Seccion, EditDelete }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {DataTop.map((item) => (
                            <th key={item.id} scope="col" className="py-3 px-6 text-center">{item.label}</th>
                        ))}
                        <th key='acciones' scope="col" className="py-3 px-6 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((item) => (
                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            {/* Condiciones para mostrar diferentes columnas según la sección */}
                            {Seccion === "Platillos" ? (
                                <>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.Nombre}
                                    </th>
                                    <td className="px-6 py-4 text-center">{item.Precio}</td>
                                    <td className="px-6 py-4 text-center">{item.Categoria}</td>
                                    <td className="px-6 py-4 text-center"><img src={item.Img} alt={item.Img} /></td>
                                </>
                            ) : Seccion === "Mesas" ? (
                                <>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.Mesa} {/* Para Mesas, muestra el número */}
                                    </th>
                                    <td className="px-6 py-4 text-center">{item.Numero}</td>
                                    <td className="px-6 py-4 text-center">{item.Capacidad}</td>
                                </>
                            ) : Seccion === "Reservas" ? (
                                <>
                                    <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.Reserva} {/* Para Reservas, muestra el nombre del cliente */}
                                    </th>
                                    <td className="px-6 py-4 text-center">{item.Cliente}</td>
                                    <td className="px-6 py-4 text-center">{item.Mesa}</td>
                                    <td className="px-6 py-4 text-center">{item.Fecha}</td>
                                    <td className="px-6 py-4 text-center">{item.Hora}</td>
                                    <td className="px-6 py-4 text-center">{item.Estado}</td>
                                </>
                            ) : null}
                            <td className="px-6 py-4 text-center">
                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => EditDelete(item, 'edit')}>
                                    Editar
                                </button>
                                <button className="font-medium ml-2 text-red-600 dark:text-red-500 hover:underline" onClick={() => EditDelete(item, 'delete')}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Datatable;