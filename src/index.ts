
// Importando express de la carpeta server
import Server from './server/server';
import router from './routes/routes';
import MySql from './mysql/mysql';

const server = Server.init(5000);
server.app.use(router);

// MySql.instance;


server.start( () => {
    console.log('Servido correndo en puerto 3000');
} )
