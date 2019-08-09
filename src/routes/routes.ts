import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();


router.get('/heroes', (req: Request, res: Response) => {

    const query = `
    SELECT * 
    FROM heroes
    `;


    MySql.ejecutarQuery( query, (err: any, heroes: Object[]) =>{

        if(err){
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                heroes: heroes
            });
        }

    });


});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const heroeId = req.params.id;

    // escapar el ID
    const escapeId = MySql.instance.cnn.escape(heroeId);

    const query = `
    SELECT * 
    FROM heroes
    where id = ${escapeId}
    `;


    MySql.ejecutarQuery( query, (err: any, heroe: Object[]) =>{

        if(err){
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                heroe: heroe[0]
            });
        }

    });

});




export default router;