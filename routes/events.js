/********************************************************************** RUTAS DE EVENTOS / EVENTS **********************************************************************/
/************************************************************************** HOST + /API/EVENTS **************************************************************************/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require( '../controllers/events' );
const { isDate } = require( '../helpers/isDate' );
const { validarJWT } = require( '../middlewares/varlidar_jwt' );
const { validarCampos } = require( '../middlewares/validar_campos' );

const router = Router();

router.use( validarJWT );

router.get( '/', getEventos );

router.post( 
    '/', 
    [ 
        check( 'title', 'Debe ingresar un título válido' ).trim().escape().not().isEmpty().isLength( { min: 2 } ).isString(),
        check( 'notes', 'Las notas son inválidas' ).trim().escape().isString(),
        check( 'start', 'Fecha de inicio de evento obligatoria' ).custom( isDate ),
        check( 'end', 'Fecha de fin de evento obligatoria' ).custom( isDate ),
        validarCampos
    ], 
    crearEvento 
);

router.put( 
    '/:id', 
    [
        check( 'title', 'Debe ingresar un título válido' ).trim().escape().not().isEmpty().isLength( { min: 2 } ).isString(),
        check( 'notes', 'Las notas son inválidas' ).trim().escape().isString(),
        check( 'start', 'Fecha de inicio de evento obligatoria' ).custom( isDate ),
        check( 'end', 'Fecha de fin de evento obligatoria' ).custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

router.delete( '/:id', eliminarEvento );

module.exports = router;
