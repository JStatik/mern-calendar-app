import types from '../types/types';
import { fetchLoginAndRegister, fetchRenew } from '../helpers/fetch';
import popUp from '../helpers/popup';
import { removeEventsLogout } from './calendar';

export const startChecking = () => {
    return async( dispatch ) => {
        const token = localStorage.getItem( 'tkca' ) || '';

        try {
            const peticion = await fetchRenew( '/auth/renew', token );
            const usuario = await peticion.json();

            if( usuario.ok ) {
                localStorage.setItem( 'tkca', usuario.token );

                dispatch( login( {
                    uid: usuario.uid,
                    name: usuario.name
                } ) );
            } else {
                dispatch( checkingFinish() );
                dispatch( startLogout() );
            }
        } catch( error ) {
            localStorage.removeItem( 'tkca' );
        }
    };
};

export const startRegister = ( name, email, password ) => {
    return async( dispatch ) => {
        const data = {
            name: name,
            email: email,
            password: password
        };

        try {
            const peticion = await fetchLoginAndRegister( '/auth/register', data );
            const usuario = await peticion.json();

            if( usuario.ok ) {
                localStorage.setItem( 'tkca', usuario.token );

                dispatch( login( {
                    uid: usuario.uid,
                    name: usuario.name
                } ) );
            } else {
                popUp( 'error', '#990000', 'Error', 'El email ingresado ya está en uso.' );
            }
        } catch( error ) {
            popUp( 'error', '#990000', 'Error', 'Error al registrarse, intente nuevamente.' );
        }
    };
};

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const data = {
            email: email,
            password: password
        };

        try {
            const peticion = await fetchLoginAndRegister( '/auth', data );
            const usuario = await peticion.json();

            if( usuario.ok ) {
                localStorage.setItem( 'tkca', usuario.token );

                dispatch( login( {
                    uid: usuario.uid,
                    name: usuario.name
                } ) );
            } else {
                popUp( 'error', '#990000', 'Error', 'Alguno de los datos ingresados no es correcto.' );
            }
        } catch( error ) {
            popUp( 'error', '#990000', 'Error', 'Error al iniciar sesión, intente nuevamente.' );
        }
    };
};

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.removeItem( 'tkca' );

        dispatch( removeEventsLogout() );              
        dispatch( logout() );
    };
};

export const checkingFinish = () => (
    {
        type: types.authCheckingFinish
    }
);

const login = ( user ) => (
    {
        type: types.authLogin,
        payload: user
    }
);

const logout = () => (
    {
        type: types.authLogout
    }
);
