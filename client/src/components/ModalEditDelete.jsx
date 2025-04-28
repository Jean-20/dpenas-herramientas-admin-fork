import Inputs from "./Inputs";

function ModalEditDelete({ isOpen, onClose, onUpdate, onDelete, Seccion, updateData, mode, DataCategory }) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let update;

        // Define el objeto de actualización según la sección
        if (Seccion === "Platillos") {
            update = {
                PlatilloID: updateData.PlatilloID,
                Nombre: formData.get('name') || updateData.Nombre,
                Descripcion: formData.get('description') || updateData.Descripcion,
                Precio: formData.get('price') || updateData.Precio,
                CategoriaPlaID: formData.get('category') || updateData.CategoriaPlaID,
                URL: formData.get('image') || updateData.Img,
            };
        } else if (Seccion === "Mesas") {
            update = {
                MesaID: updateData.Mesa,
                Numero: formData.get('number') || updateData.Numero,
                Capacidad: formData.get('capacity') || updateData.Capacidad,
            };
        } else if (Seccion === "Reservas") {
            update = {
                ReservaID: updateData.Reserva,
                ClienteID: formData.get('cliente') ||  updateData.ClienteID,
                MesaID: formData.get('mesa') || updateData.Mesa,
                FechaPedido: formData.get('fecha') || updateData.Fecha,
                HorarioID: formData.get('hora') || updateData.HorarioID,
                Estado: formData.get('estado') || updateData.Estado,
            };
        }

        onUpdate(update);
        onClose();
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${!isOpen && 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                {mode === 'edit' ? (
                    <>
                        <h2 className="text-xl font-bold text-center mb-4">Editar {Seccion}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {Seccion === "Platillos" && (
                                <>
                                <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
                                    <Inputs item={{ label: 'Nombre', name: 'name', type: 'text' }} value={updateData.Nombre} />
                                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <Inputs item={{ label: 'Descripción', name: 'description', type: 'text' }} value={updateData.Descripcion} />
                                <label className="block text-sm font-medium text-gray-700">Precio</label>
                                    <Inputs item={{ label: 'Precio', name: 'price', type: 'number' }} value={updateData.Precio} />
                                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                                    <Inputs item={{ label: 'Categoria', name: 'categoria', type: 'select' }} SelectData={DataCategory} value={updateData.CategoriaPlaID} />
                                <label className="block text-sm font-medium text-gray-700">URL</label>
                                    <Inputs item={{ label: 'Imagen', name: 'image', type: 'text' }} value={updateData.Img} />
                                </>
                            )}
                            {Seccion === "Mesas" && (
                                <>
                                <label className="block text-sm font-medium text-gray-700">Numero</label>
                                    <Inputs item={{ label: 'Número', name: 'number', type: 'number' }} value={updateData.Numero} />
                                <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                                    <Inputs item={{ label: 'Capacidad', name: 'capacity', type: 'number' }} value={updateData.Capacidad} />
                                </>
                            )}
                            {Seccion === "Reservas" && (
                                <>
                                    <label className="block text-sm font-medium text-gray-700">Reserva</label>
                                    <Inputs item={{ label: 'Reserva', name: 'reserva', type: 'text' }} value={updateData.Reserva} />
                                    <label className="block text-sm font-medium text-gray-700">Cliente</label>
                                    <Inputs item={{ label: 'Cliente', name: 'cliente', type: 'text' }} value={updateData.Cliente} />
                                    <label className="block text-sm font-medium text-gray-700">Mesa</label>
                                    <Inputs item={{ label: 'Mesa', name: 'mesa', type: 'number' }} value={updateData.Mesa} />
                                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                                    <Inputs item={{ label: 'Fecha', name: 'fecha', type: 'text' }} value={updateData.Fecha} />
                                    <label className="block text-sm font-medium text-gray-700">Hora</label>
                                    <Inputs item={{ label: 'Hora', name: 'hora', type: 'text' }} value={updateData.Hora} />
                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                    <Inputs item={{ label: 'Estado', name: 'estado', type: 'text' }} value={updateData.Estado} />
                                </>
                            )}
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">Cancelar</button>
                                <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-blue-700">Actualizar</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-center mb-4">Eliminar {Seccion}</h2>
                        <p>¿Estás seguro de que deseas eliminar el {Seccion}: <strong>{updateData.PlatilloID ||updateData.Reserva || updateData.Mesa}</strong>?</p>
                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">Cancelar</button>
                            <button onClick={() => { onDelete(updateData); onClose(); }} className="bg-red-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-red-700">Eliminar</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalEditDelete;