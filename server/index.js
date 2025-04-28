import app from './app.js'
import {getConnection} from './src/database/connection.js'

getConnection();

app.listen(/* procces.env.PORT || */ 3000);
console.log('Server on port', /* procces.env.PORT || */ 3000);