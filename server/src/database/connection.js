import sql from 'mssql'

const dbSettings = {
    user: "UsuarioA",
    password: "papaya",
    server: "localhost",
    database: "ReservaMesas",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings)
        return pool;
    } catch (error) {
        console.log(error)
    }
}