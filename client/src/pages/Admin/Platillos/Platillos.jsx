import { useState, useEffect } from 'react';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Datatable from '../../../components/Datatable';
import FilterButton from '../../../components/DropdownFilter';
import { useAdmin } from '../../../context/AdminContext';
import Modal from '../../../components/Modal';
import ModalEditDelete from '../../../components/ModalEditDelete';

const View = "Platillos";
const inputdata = [
  { label: 'Nombre', type: 'text', name: 'name' },
  { label: 'Descripción', type: 'text', name: 'description' },
  { label: 'Precio', type: 'number', name: 'price' },
  { label: 'Categoria', type: 'select', name: 'category' },
  { label: 'Imagen', type: 'text', name: 'image' }
];

const dataTop = [
  { id: 'name', label: 'Nombre' },
  { id: 'price', label: 'Precio' },
  { id: 'category', label: 'Categoría' },
  { id: 'img', label: 'Imagen' }
];


function Platillos() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categoriasPla, getCategoriasPla } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditDeleteOpen, setIsModalEditDeleteOpen] = useState(false);
  const [modalEditDeleteData, setModalEditDeleteData] = useState(null);
  const [mode, setMode] = useState('edit');
  const [platillos, setPlatillos] = useState([]);
  const { createPlatillos, updatePlatillos, deletePlatillos, TablePlatillos, getTablePlatillos } = useAdmin();

  useEffect(() => {
    getTablePlatillos();
    getCategoriasPla();
  }, []);

  const addDish = (newDish) => {
    setPlatillos([...platillos, newDish]);
    createPlatillos(newDish)
    console.log(newDish);
  };

  const updateDish = (editDish) => {
    // Eliminar propiedades con valores null o ''
    const sanitizedEditDish = Object.fromEntries(
      Object.entries(editDish).filter(([value]) => value !== null && value !== '')
  );

  // Actualizar el estado de platillos con el plato editado
  setPlatillos(platillos.map(dish => dish.PlatilloID === sanitizedEditDish.PlatilloID ? sanitizedEditDish : dish));
    updatePlatillos(sanitizedEditDish)
    console.log(sanitizedEditDish);
  };

  const deleteDish = (PlatilloID) => {
    setPlatillos(platillos.filter(dish => dish.PlatilloID !== PlatilloID));
    deletePlatillos(PlatilloID)
    console.log(`Platillo ${PlatilloID.PlatilloID} eliminado`);
  };

  const handleEditDelete = (item, action) => {
    setModalEditDeleteData(item);
    setMode(action);
    setIsModalEditDeleteOpen(true);
  };

  const closeModalEditDelete = () => {
    setIsModalEditDeleteOpen(false);
    setModalEditDeleteData(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Platillos</h1>
              </div>
              {/* Middle: Boxes */}
              <div className="grid grid-cols-3 gap-6">
              <div className="group bg-white shadow-lg shadow-gray-200 rounded-xl p-2.5 transition-all duration-500 w-56 ml-14 hover:shadow-gray-300">
                  <h4 className="font-manrope font-bold text-xl text-gray-900 text-center">Número de Platillos</h4>
                  <p className="text-base font-medium text-gray-500 text-center">{TablePlatillos.length}</p>
              </div>  
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800" onClick={() => setIsModalOpen(true)}>
                  Agregar Platillo +
                </button>
              </div>
            </div>
            <Datatable DataTop={dataTop} Data={TablePlatillos} Seccion={View} EditDelete={handleEditDelete} />
          </div>
        </main>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addDish}
        Seccion={View}
        inputData={inputdata}
        DataCategory={categoriasPla}
      />
      <ModalEditDelete
        isOpen={isModalEditDeleteOpen}
        onClose={closeModalEditDelete}
        onUpdate={updateDish}
        onDelete={deleteDish}
        mode={mode}
        Seccion={View}
        updateData={modalEditDeleteData}
        DataCategory={categoriasPla}
      />
    </div>
  );
}

export default Platillos;