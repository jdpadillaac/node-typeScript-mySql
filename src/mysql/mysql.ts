import mysql = require('mysql');


export default class MySql{

    private static _instance: MySql;


    cnn: mysql.Connection;
    public conectado: boolean = false;


    constructor(){
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'heroes'
        });

        this.conectarDB()       
    }


    public static get instance(){
        return this._instance || (this._instance = new this);
    }

    static ejecutarQuery( query: string, callback: Function ){
        
        this.instance.cnn.query(query, (err, results: Object[], fields ) => {

            if(err){
                console.log('Error en la query ');
                console.log(err);

                return callback (err)                
            }

            if(results.length === 0){
                callback('El registro solicitado no existe')
            } else{
            callback(null, results);
            }

        })

    }


    private conectarDB(){
        this.cnn.connect( (err:mysql.MysqlError) => {
            if(err){
                console.log(err.message);
                return
                
            }
            this.conectado = true;
            console.log('Bade de datos online');
            
        } )
    }

}