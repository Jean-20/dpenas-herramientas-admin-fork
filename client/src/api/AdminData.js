import axios from './axios'

//Platillos
export const getPlatillos = () => axios.get('/getplatillos')
export const createPlatillo = platillo => axios.post(`/platillos/createplatillo`, platillo)
export const updatePlatillo = (platillo) => axios.put(`/platillos/updateplatillo/${platillo.PlatilloID}`, platillo)
export const deletePlatillo = (platillo) => axios.delete(`/platillos/deleteplatillo/${platillo.PlatilloID}`, platillo)
export const getCategoriasPlatillos = () => axios.get('/platillos/getcategorias')

//Mesas
export const createMesa = (mesa) => axios.post('/mesas/createmesa', mesa)
export const updateMesa = (mesa) => axios.put(`/mesas/updatemesa/${mesa.MesaID}`, mesa)
export const deleteMesa = (mesa) => axios.delete(`/mesas/deletemesa/${mesa.Mesa}`, mesa)

//Reservas
export const createReserva = (reserva) => axios.post('/reservas/createreserva', reserva)
export const updateReserva = (reserva) => axios.put(`/reservas/updatereserva/${reserva.ReservaID}`, reserva)
export const deleteReserva = (reserva) => axios.delete(`/reservas/deletereserva/${reserva.Reserva}`, reserva)
export const getHorario = () => axios.get('/reservas/horarios')


//Tables
export const GetTABLEPlatillos = () => axios.get(`/platillos/tableplatillos`)
export const GetTABLEMesas = () => axios.get(`/mesas/tablemesas`)
export const GetTABLEReservas = () => axios.get(`/reservas/tablereservas`)
