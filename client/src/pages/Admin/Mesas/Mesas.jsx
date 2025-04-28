import { useEffect, useState } from 'react';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Datatable from '../../../components/Datatable';
import { useAdmin } from '../../../context/AdminContext';
import Modal from '../../../components/Modal';
import ModalEditDelete from '../../../components/ModalEditDelete';

const View = "Mesas";
const inputdata = [
  { label: 'Número', type: 'text', name: 'number' },
  { label: 'Capacidad', type: 'number', name: 'capacity' }
];

const dataTop = [
  { id: 'mesa', label: 'Mesa' },
  { id: 'number', label: 'Número' },
  { id: 'capacity', label: 'Capacidad'}
];

function Mesas() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditDeleteOpen, setIsModalEditDeleteOpen] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [mode, setMode] = useState('edit');
  const [modalEditDeleteData, setModalEditDeleteData] = useState(null);
  const {TableMesas, getTableMesas } = useAdmin();
  const {createMesas, updateMesas, deleteMesas} = useAdmin();

  useEffect(() => {
    getTableMesas();
  }, []);

  const addMesa = (newMesa) => {
    setMesas([...mesas, newMesa]);
    createMesas(newMesa)
    
    // Aquí puedes agregar la lógica para enviar los datos a tu API
  };

  const updateMesa = (updatedMesa) => {
    setMesas(mesas.map(mesa => mesa.id === updatedMesa.id ? updatedMesa : mesa));
    updateMesas(updatedMesa)
    console.log(updatedMesa);
  };

  const deleteMesa = (mesaId) => {
    setMesas(mesas.filter(mesa => mesa.id !== mesaId));
    deleteMesas(mesaId)
    console.log(mesaId)
    console.log(`Mesa ${mesaId} eliminada`);
  };

  const handleEditDelete = (mesa, action) => {
    setModalEditDeleteData(mesa);
    setMode(action);
    setIsModalEditDeleteOpen(true);
  };

  const closeModalEditDelete = () => {
    setIsModalEditDeleteOpen(false);
    setModalEditDeleteData(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Mesas actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Mesas</h1>
              </div>

              {/* Middle: Boxes */}
              <div className="grid grid-cols-3 gap-6">
              <div className="group bg-white shadow-lg shadow-gray-200 rounded-xl p-2.5 transition-all duration-500 w-56 ml-14 hover:shadow-gray-300">
                  <h4 className="font-manrope font-bold text-xl text-gray-900 text-center">Número de {View}</h4>
                  <p className="text-base font-medium text-gray-500 text-center">{TableMesas.length}</p>
              </div>  
              </div>

              {/* Right: Buttons */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add button */}
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800" onClick={() => setIsModalOpen(true)}>
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Agregar Mesas +</span>
                </button>                
              </div>

            </div>

            <Datatable DataTop={dataTop} Data={TableMesas} Seccion={View} EditDelete={handleEditDelete} />

          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addMesa}
        Seccion={View}
        inputData={inputdata}
        DataCategory={[]}
      />

      <ModalEditDelete
        isOpen={isModalEditDeleteOpen}
        onClose={closeModalEditDelete}
        onUpdate={updateMesa}
        onDelete={deleteMesa}
        mode={mode} // o "delete" dependiendo del caso
        Seccion={View}
        updateData={modalEditDeleteData}
        DataCategory={[]} // Si no hay categorías, puedes dejarlo vacío
      />
    </div>
  );
}

export default Mesas;