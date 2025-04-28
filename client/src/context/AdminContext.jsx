import { createContext, useContext, useState } from "react";
import { createMesa, createPlatillo, createReserva, deleteMesa, deletePlatillo, deleteReserva, getCategoriasPlatillos, getHorario, updateMesa, updatePlatillo, updateReserva } from '../api/AdminData.js'
import { GetTABLEMesas, GetTABLEPlatillos, GetTABLEReservas } from '../api/AdminData.js'

const AdmContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdmContext); 
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


export function AdminContext({ children }){
    const [errors, setErrors] = useState([]);

//Create
const createPlatillos = async (platillo) => {
    try {
        const res = await createPlatillo(platillo); 
        console.log(res)
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message]);
        console.log(errors)
    }
}
const createMesas = async (mesa) => {
    try {
        const res = await createMesa(mesa); 
        console.log(res)
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message]);
        console.log(errors)
    }
}
const createReservas = async (reserva) => {
    try {
        const res = await createReserva(reserva); 
        console.log(res)
    } catch (error) {
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message]);
        console.log(errors)
    }
}


//Update
const updatePlatillos = async (platillo) => {
    try {
        const res = await updatePlatillo(platillo);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const updateMesas = async (mesa) => {
    try {
        const res = await updateMesa(mesa);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const updateReservas = async (reserva) => {
    try {
        const res = await updateReserva(reserva);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

//Delete
const deletePlatillos = async (platillo) => {
    try {
        const res = await deletePlatillo(platillo);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const deleteMesas = async (mesa) => {
    try {
        const res = await deleteMesa(mesa);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
const deleteReservas = async (reserva) => {
    try {
        const res = await deleteReserva(reserva);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}


const [TablePlatillos, setTablePlatillos] = useState([]);
const [TableMesas, setTableMesas] = useState([]);
const [TableReservas, setTableReservas] = useState([]);
//Tables
const getTablePlatillos = async () => {
    try {
        const res = await GetTABLEPlatillos();
        setTablePlatillos(res.data)
    } catch (error) {
        console.log(error)
    }
}
const getTableMesas = async () => {
    try {
        const res = await GetTABLEMesas();
        setTableMesas(res.data)
    } catch (error) {
        console.log(error)
    }
}
const getTableReservas = async () => {
    try {
        const res = await GetTABLEReservas();
        setTableReservas(res.data)
    } catch (error) {
        console.log(error)
    }
}

const [categoriasPla, setCategoriaPla] = useState([]);
const [horario, setHorario] = useState([]);
const getCategoriasPla = async () => {
    try {
        const res = await getCategoriasPlatillos();
        setCategoriaPla(res.data)
    } catch (error) {
        console.log(error)
    }
}
const getHorarios = async () => {
    try {
        const res = await getHorario();
        setHorario(res.data)
    } catch (error) {
        console.log(error)
    }
}

    return (
        <AdmContext.Provider value={{
            createPlatillos, updatePlatillos, deletePlatillos,
            createMesas, updateMesas, deleteMesas,
            createReservas, updateReservas, deleteReservas,
            horario, getHorarios,
            TablePlatillos, getTablePlatillos,
            TableMesas, getTableMesas,
            TableReservas, getTableReservas,
            categoriasPla, getCategoriasPla
        }}>
            { children }
        </AdmContext.Provider>
    )
}