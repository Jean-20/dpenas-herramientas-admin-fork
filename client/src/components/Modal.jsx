import Inputs from "./Inputs";

function Modal({ isOpen, onClose, onSubmit, Seccion, inputData, DataCategory }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let newData;
        console.log(formData.get('fecha'))

        // Construir el objeto según la sección
        if (Seccion === "Platillos") {
            newData = {
                Nombre: formData.get('name'),
                Descripcion: formData.get('description'),
                Precio: formData.get('price'),
                CategoriaPlaID: formData.get('category'),
                Img: formData.get('image'),
            };
        } else if (Seccion === "Mesas") {
            newData = {
                Numero: formData.get('number'),
                Capacidad: formData.get('capacity'),
            };
        } else if (Seccion === "Reservas") {
            newData = {
                ClienteID: formData.get('cliente'),
                MesaID: formData.get('mesa'),
                FechaPedido: formData.get('fecha'),
                HorarioID: formData.get('hora'),
                Estado: formData.get('estado')
            };
        }

        onSubmit(newData);
        onClose();
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${!isOpen && 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl font-bold text-center mb-4">Agregar {Seccion}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {inputData.map((item) => (
                        <div key={item.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {item.label}
                                <Inputs item={item} SelectData={DataCategory} />
                            </label>
                        </div>
                    ))}
                    <div className="flex justify-between mt-6">
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2 transition duration-200 hover:bg-blue-700">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;