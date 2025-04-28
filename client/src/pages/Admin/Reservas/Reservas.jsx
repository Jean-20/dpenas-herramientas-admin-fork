import { useState, useEffect } from "react";
import Sidebar from "../../../partials/Sidebar";
import Header from "../../../partials/Header";
import Datatable from "../../../components/Datatable";
import FilterButton from "../../../components/DropdownFilter";
import { useAdmin } from "../../../context/AdminContext";
import Modal from "../../../components/Modal";
import ModalEditDelete from "../../../components/ModalEditDelete";

const View = "Reservas";
const inputdata = [
  { label: 'Cliente', type: 'text', name: 'cliente' },
  { label: 'Mesa', type: 'text', name: 'mesa' },
  { label: 'Fecha', type: 'text', name: 'fecha' },
  { label: 'Hora', type: 'text', name: 'hora' },
  { label: 'Estado', type: 'text', name: 'estado' },
];

const dataTop = [
  { id: 'reserva', label: 'Reserva' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'mesa', label: 'Mesa' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'hora', label: 'Hora' },
  { id: 'estado', label: 'Estado' },
];

function Reservas() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getTableReservas, TableReservas } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditDeleteOpen, setIsModalEditDeleteOpen] = useState(false);
  const [modalEditDeleteData, setModalEditDeleteData] = useState(null);
  const [mode, setMode] = useState('edit');
  const [reservas, setReservas] = useState([]);
  const { createReservas, updateReservas, deleteReservas } = useAdmin();
  
  useEffect(() => {
    getTableReservas();
  }, []);


  const addReserva = (newReserva) => {
    setReservas([...reservas, newReserva]);
    createReservas(newReserva)
    console.log(newReserva);
  };

  const updateReserva = (editReserva) => {
    setReservas(reservas.map(reserva => reserva.id === editReserva.id ? editReserva : reserva));
    updateReservas(editReserva)
    console.log(editReserva);
  };

  const deleteReserva = (id) => {
    setReservas(reservas.filter(reserva => reserva.id !== id));
    deleteReservas(id)
    console.log(`Reserva ${id} eliminada`);
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Reservas</h1>
              </div>
              {/* Middle: Boxes */}
              <div className="grid grid-cols-3 gap-6">
              <div className="group bg-white shadow-lg shadow-gray-200 rounded-xl p-2.5 transition-all duration-500 w-56 ml-14 hover:shadow-gray-300">
                  <h4 className="font-manrope font-bold text-xl text-gray-900 text-center">Número de {View}</h4>
                  <p className="text-base font-medium text-gray-500 text-center">{TableReservas.length}</p>
              </div>  
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800" onClick={() => setIsModalOpen(true)}>
                  Agregar Reserva +
                </button>
              </div>
            </div>
            <Datatable DataTop={dataTop} Data={TableReservas} Seccion={View} EditDelete={handleEditDelete} />
          </div>
        </main>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addReserva}
        Seccion={View}
        inputData={inputdata}
      />
      <ModalEditDelete
        isOpen={isModalEditDeleteOpen}
        onClose={closeModalEditDelete}
        onUpdate={updateReserva}
        onDelete={deleteReserva}
        mode={mode}
        Seccion={View}
        updateData={modalEditDeleteData}
      />
    </div>
  );
}

export default Reservas;