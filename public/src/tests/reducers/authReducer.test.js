import '@testing-library/jest-dom';
import authReducer from '../../reducers/authReducer';
import types from '../../types/types';

let initialState = {
    checking: true,
    uid: null,
    name: null
};

describe( 'Pruebas en authReducer', () => {
    test( 'Debe retornar el estado por defecto', () => {
        const state = authReducer( initialState, {} );

        expect( state ).toEqual( initialState );
    } );

    test( 'Debe retornar el estado cuando hace login el usuario', () => {
        const user = {
            uid: '123',
            name: 'Pepe Ruiz'
        };

        const state = authReducer( initialState, {
            type: types.authLogin,
            payload: user
        } );

        expect( state ).toEqual( {
            ...state,
            checking: false,
            uid: user.uid,
            name: user.name
        } );

        initialState = state;
    } );

    test( 'Debe retornar el estado cuando hace logout el usuario', () => {
        const state = authReducer( initialState, {
            type: types.authLogout
        } );

        expect( state ).toEqual( {
            ...state,
            checking: false,
            uid: null,
            name: null
        } );
    } );
} );
