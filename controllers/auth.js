const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );
const Usuario = require( '../models/Usuario' );
const { generarJWT } = require( '../helpers/jwt' );

const loginUsuario = async( req, res = response ) => {
    const { email: emailReq, password: passwordReq } = req.body;

    try {
        const usuario = await Usuario.findOne( { email: emailReq } );

        if( !usuario ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'Los datos ingresados no son válidos'
                }
            );
        }

        const validPassword = bcrypt.compareSync( passwordReq, usuario.password );

        if( !validPassword ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'Los datos ingresados no son válidos'
                }
            );
        }

        const token = await generarJWT( usuario.id, usuario.name );

        return res.status( 200 ).json(
            {
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token: token
            }
        );
    } catch( error ) {
        console.log( error );

        return res.status( 500 ).json(
            {
                ok: false,
                msg: 'Por favor, hable con el administrador'
            }
        );
    }
};

const crearUsuario = async( req, res = response ) => {
    const { email: emailReq, password: passwordReq } = req.body;

    try {
        let usuario = await Usuario.findOne( { email: emailReq } );

        if( usuario ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'El email ingresado ya está en uso'
                }
            );
        }

        usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( passwordReq, salt );

        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name );

        return res.status( 201 ).json(
            {
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token: token
            }
        );
    } catch( error ) {
        console.log( error );

        return res.status( 500 ).json(
            {
                ok: false,
                msg: 'Por favor, hable con el administrador'
            }
        );
    }
};

const revalidarToken = async( req, res = response ) => {
    const { uid, name } = req;

    const token = await generarJWT( uid, name );
    
    return res.json(
        {
            ok: true,
            uid: uid,
            name: name,
            token: token
        }
    );
};

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
};
