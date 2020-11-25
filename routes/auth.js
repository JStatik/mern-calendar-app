/*********************************************************************** RUTAS DE USUARIO / AUTH ***********************************************************************/
/*************************************************************************** HOST + /API/AUTH ***************************************************************************/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { loginUsuario, crearUsuario, revalidarToken } = require( '../controllers/auth' );
const { validarCampos } = require( '../middlewares/validar_campos' );
const { validarJWT } = require('../middlewares/varlidar_jwt');

const router = Router();

router.post( 
    '/',
    [
        check( 'email', 'Debe ingresar un email válido' ).isEmail().normalizeEmail(),
        check( 'password', 'Debe ingresar un password válido: Al menos 6 caracteres y alfanúmerico' ).isLength( { min: 6 } ).isAlphanumeric(),
        validarCampos
    ],
    loginUsuario
);

router.post( 
    '/register', 
    [ 
        check( 'name', 'Debe ingresar un nombre válido' ).trim().escape().not().isEmpty().isLength( { min: 2 } ).isString(),
        check( 'email', 'Debe ingresar un email válido' ).isEmail().normalizeEmail(),
        check( 'password', 'Debe ingresar un password válido: Al menos 6 caracteres y alfanúmerico' ).isLength( { min: 6 } ).isAlphanumeric(),
        validarCampos
    ], 
    crearUsuario 
);

router.get( '/renew', validarJWT, revalidarToken );

module.exports = router;
