import { getConnection } from "../database/connection.js";
import {createAccessToken} from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";
import sql from 'mssql'

export const register = async (req, res) => {
    const{Codigo, Nombre, Apellido, Contrasena} = req.body;

    const pool = await getConnection();

    try {
        const AdminFound = await pool.request()
        .input('Codigo', sql.NVarChar, Codigo)
        .input('Contrasena', sql.NVarChar, Contrasena)
        .query('Select * from Administrador where Codigo = @Codigo and Contrasena = @Contrasena')

        if(AdminFound){
            return res.status(200).json({message: 'Admin already exists'})
        }

        const result = await pool.request()
        .input('Codigo', sql.NVarChar, Codigo)
        .input('Nombre', sql.NVarChar, Nombre)
        .input('Apellido', sql.NVarChar, Apellido)
        .input('Contrasena', sql.NVarChar, Contrasena)
        .query('INSERT INTO Clientes (Codigo, Nombre, Apellido, Contrasena) VALUES (@Codigo, @Nombre, @Apellido, @Contrasena)')

        console.log(result)

        const token = await createAccessToken({ id: result.AdministradorID });
    
        res.cookie("token", token);

        res.json({
            AdminID: result.recordset[0].AdminID,
            Nombre: Nombre,
            Apellido: Apellido,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { Codigo, Contrasena } = req.body;

    const pool = await getConnection();

    try {
        const AdminFound = await pool.request()
        .input('Codigo', sql.NVarChar, Codigo)
        .input('Contrasena', sql.NVarChar, Contrasena)
        .query('Select * from Administrador where Codigo = @Codigo and Contrasena = @Contrasena')
        if(!AdminFound){
            return res.status(404).json({message: 'Admin not found'})
        }
        const token = await createAccessToken({ id: AdminFound.AdministradorID });

        res.cookie("token", token);
        
        res.json({
            AdminID: AdminFound.recordset[0].AdministradorID,
            Nombre: AdminFound.recordset[0].Nombre,
            Apellido: AdminFound.recordset[0].Apellido,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
} 

export const profile = async (req, res) => {
    const {AdministradorID} = req.body

    const pool = await getConnection();
    
    try {
        const AdminFound = await pool.request()
        .input('AdministradorID', sql.NVarChar, AdministradorID)
        .query('Select * from Administrador where AdministradorID = @AdministradorID')

        if(!AdminFound){
            return res.status(404).json({message: 'User not found'})
        }

        return res.json({
            AdminID: AdminFound.recordset[0].AdminID,
            Codigo: AdminFound.recordset[0].Codigo,
            Nombre: AdminFound.recordset[0].Nombre,
            Apellido: AdminFound.recordset[0].Apellido,
        })
    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies
    if(!token)  return res.status(401).json({message: 'Unauthorized'})

        const pool = await getConnection();

        jwt.verify(token, TOKEN_SECRET, async (err, AdministradorID) => {
            if(err) return res.status(401).json({message: 'Unauthorized'}) 
                const AdminFound = await pool.request()
            .input('AdministradorID', sql.Int, AdministradorID)
            .query('Select * from Administrador where AdministradorID = @AdministradorID')

            if(!AdminFound) return res.status(401).json({message: 'Unauthorized'}) 

                return res.json({
                    AdministradorID: AdminFound.recordset[0].AdministradorID,
                    Codigo: AdminFound.recordset[0].Codigo,
                })
        })
}