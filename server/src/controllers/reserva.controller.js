import { getConnection } from "../database/connection.js";
import sql from 'mssql'

export const getReservaciones = async (req, res) =>{
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Reserva')
    res.json(result)
}
export const getReservacion = async (req, res) =>{
    const pool = await getConnection();
    
    const result = await pool.request()
    .input('ReservaID',  sql.Int, req.params.id)
    .query('Select * from Reserva where ReservaID = @ReservaID')

    res.json(result);
    console.log(result)
} 

export const createReservacion = async (req, res) =>{
    console.log(req.body);

    const pool = await getConnection();
    const result = await pool.request()
    .input('ClienteID', sql.Int, req.body.ClienteID)
    .input('MesaID', sql.NVarChar, req.body.MesaID)
    .input('FechaPedido', sql.NVarChar, req.body.FechaPedido)
    .input('HorarioID', sql.Int, req.body.HorarioID)
    .input('Estado', sql.VarChar, req.body.Estado)
    .query('Insert into Reserva (ClienteID, MesaID, FechaPedido, HorarioID, Estado) values (@ClienteID, @MesaID, @FechaPedido, @HorarioID, @Estado); Select SCOPE_IDENTITY() as ReservaID')
    
    console.log(result)

    res.json({
        ReservaID: result.recordset[0].ReservaID,
        ClienteID: req.body.ClienteID,
        FechaPedido: req.body.FechaPedido,
        MesaID: req.body.MesaID,
        HorarioID: req.body.HorarioID,
        Estado: req.body.Estado
    })

} 

export const putReservacion = async (req, res) =>{
    console.log(req.body);
    const pool = await getConnection();
    const result = await pool.request()
    .input('ReservaID', sql.Int, req.params.id)
    .input('ClienteID', sql.Int, req.body.ClienteID)
    .input('MesaID', sql.NVarChar, req.body.MesaID)
    .input('FechaPedido', sql.NVarChar, req.body.FechaPedido)
    .input('HorarioID', sql.Int, req.body.HorarioID)
    .input('Estado', sql.NVarChar, req.body.Estado)
    .query('Update Reserva set ClienteID= @ClienteID, MesaID = @MesaID, FechaPedido= @FechaPedido, HorarioID= @HorarioID, Estado= @Estado where ReservaID = @ReservaID')
    
    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message:'Reserva no encontrada'})
    }

    res.json({
        ReservaID: req.params.id,
        ClienteID: req.body.ClienteID,
        MesaID: req.body.MesaID,
        FechaPedido: req.body.FechaPedido,
        HorarioID: req.body.HorarioID,
        Estado: req.body.Estado
    })
}

export const deleteReservacion = async (req, res) =>{
    const pool = await getConnection();
    const result = await pool.request()
    .input('ReservaID',  sql.Int, req.params.id)
    .query('Delete from Reserva where ReservaID = @ReservaID')
    console.log(result)
    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message:'Reserva no encontrada'})
    }
    return res.json({message:'Reservacion eliminada con exito'})
}

export const getHorarios = async (req, res) =>{
    const pool = await getConnection();
    const result = await pool.request()
    .query('Select * from Horario')
    res.json(result)
}


export const getTableReservas = async (req, res) =>{
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT R.ReservaID AS Reserva, C.Nombre AS Cliente , R.MesaID AS Mesa, R.FechaPedido AS Fecha, H.Hora AS Hora, R.Estado AS Estado, R.ClienteID AS ClienteID, R.HorarioID AS HorarioID FROM Reserva R INNER JOIN Clientes C ON R.ClienteID = C.ClienteID INNER JOIN Horario H ON R.HorarioID = H.HorarioID;");
        const formattedResult = result.recordset.map(item => ({
            Reserva: item.Reserva,
            ClienteID: item.ClienteID,
            Cliente: item.Cliente,
            Mesa: item.Mesa,
            Fecha: item.Fecha,
            HorarioID: item.HorarioID,
            Hora: item.Hora,
            Estado: item.Estado
        }));
        res.json(formattedResult);
    } catch (error) {
        console.log(error)
    }    
}