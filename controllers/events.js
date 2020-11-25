const { response } = require( 'express' );
const Evento = require( '../models/Evento' );

const getEventos = async( req, res = response ) => {
    const eventos = await Evento.find();

    return res.status( 200 ).json(
        {
            ok: true,
            eventos: eventos
        }
    );
};

const crearEvento = async( req, res = response ) => {
    const evento = new Evento( req.body );

    try {
        const { uid, name } = req;
        const user = {
            uid: uid,
            name: name
        };

        evento.user = user;

        const eventoGuardado = await evento.save();

        return res.status( 200 ).json(
            {
                ok: true,
                evento: eventoGuardado
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

const actualizarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;
    const { uid: uidReq, name: nameReq } = req;

    if( eventoId.length !== 24 ) {
        return res.status( 400 ).json(
            {
                ok: false,
                msg: 'El ID es incorrecto'
            }
        );
    }

    try {
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status( 404 ).json(
                {
                    ok: false,
                    msg: 'El evento es inexistente por ese ID'
                }
            );
        }

        const { uid: uidEvento, name: nameEvento } = evento.user;

        if( uidReq !== uidEvento || nameReq !== nameEvento ) {
            return res.status( 401 ).json(
                {
                    ok: false,
                    msg: 'No tiene privilegios de edicion sobre el evento'
                }
            );
        }

        const nuevoEvento = {
            ...req.body,
            user: {
                uid: uidReq,
                name: nameReq
            }
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return res.status( 200 ).json(
            {
                ok: true,
                evento: eventoActualizado
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

const eliminarEvento = async( req, res = response ) => {
    const eventoId = req.params.id;
    const { uid: uidReq, name: nameReq } = req;

    if( eventoId.length !== 24 ) {
        return res.status( 400 ).json(
            {
                ok: false,
                msg: 'El ID es incorrecto'
            }
        );
    }

    try {
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status( 404 ).json(
                {
                    ok: false,
                    msg: 'El evento es inexistente por ese ID'
                }
            );
        }

        const { uid: uidEvento, name: nameEvento } = evento.user;

        if( uidReq !== uidEvento || nameReq !== nameEvento ) {
            return res.status( 401 ).json(
                {
                    ok: false,
                    msg: 'No tiene privilegios de eliminacion sobre el evento'
                }
            );
        }

        await Evento.findByIdAndDelete( eventoId );

        return res.status( 200 ).json(
            {
                ok: true,
                msg: 'Evento eliminado correctamente'
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

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};
