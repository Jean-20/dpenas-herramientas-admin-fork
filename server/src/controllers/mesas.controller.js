import { getConnection } from "../database/connection.js";
import sql from 'mssql'


export const createMesa = async (req, res) => {
    try {
        console.log(req.body)
        const Disponible = 0;
        const pool = await getConnection();
        const result = await pool.request()
        .input('Numero', sql.Int, req.body.Numero)
        .input('Capacidad', sql.Int, req.body.Capacidad)
        .input('Disponible', sql.Bit, Disponible)
        .query("INSERT INTO Mesas (Numero, Capacidad, Disponible) VALUES (@Numero, @Capacidad, @Disponible) Select SCOPE_IDENTITY() as MesaID")
        console.log(result)
        res.json({
            MesaID: result.recordset[0].MesaID,
            Numero: req.body.Numero,
            Capacidad: req.body.Capacidad,
            Disponible: Disponible
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateMesa = async (req, res) => {
    try {
        console.log(req.body)
        const Disponible = 0;
        const pool = await getConnection();
        const result = await pool.request()
        .input('MesaID', sql.NVarChar, req.params.id)
        .input('Numero', sql.NVarChar, req.body.Numero)
        .input('Capacidad', sql.NVarChar, req.body.Capacidad)
        .input('Disponible', sql.Bit, Disponible)
        .query("UPDATE Mesas SET Numero = @Numero, Capacidad = @Capacidad, Disponible = @Disponible WHERE MesaID = @MesaID")
        if(result.rowsAffected[0]===0){
            return res.status(404).json({message: "Mesa no encontrada"})
        }
        res.json({
            MesaID: req.params.id,
            Numero: req.body.Numero,
            Capacidad: req.body.Capacidad,
            Disponible: Disponible
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteMesa = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input('MesaID', sql.NVarChar, req.params.id)
        .query("DELETE FROM Mesas WHERE MesaID = @MesaID")
        console.log(result)
        if(result.rowsAffected[0]===0){
            return res.status(404).json({message: "Mesa no encontrada"})
        }
        return res.json({ message: "Mesa eliminada con exito"})
    } catch (error) {
        console.log(error)
    }
}


export const getTableMesas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Mesas");
        const formattedResult = result.recordset.map(item => ({
            Mesa: item.MesaID,
            Numero: item.Numero,
            Capacidad: item.Capacidad
        }));
        res.json(formattedResult);
    } catch (error) {
        console.log(error)
    }
}