function Inputs({ item, SelectData, value, onChange }) {
    if (item.type === 'text' || item.type === 'number') {
        return (
            <input
                type={item.type}
                name={item.name}
                 // Maneja el valor del input
                onChange={onChange} // Llama a la función onChange para manejar cambios
                
                className="mb-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-1.5"
            />
        );
    }

    if (item.type === 'select') {
        return (
            <select
                name={item.name}
                 // Maneja el valor del select
                onChange={onChange} // Llama a la función onChange para manejar cambios
                
                className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
            >
                <option value="" disabled>
                    Escoge Categoria
                </option>
                {SelectData.map((option, index) => (
                    <option key={index} value={option.CategoriaValue}>
                        {option.Categoria}
                    </option>
                ))}
            </select>
        );
    }

    return null; // Retorna null si no coincide con ningún tipo
}

export default Inputs;