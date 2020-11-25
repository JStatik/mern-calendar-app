import '@testing-library/jest-dom';
import uiReducer from '../../reducers/uiReducer';
import types from '../../types/types';

let initialState = {
    openModal: false,

};

describe( 'Pruebas en uiReducer', () => {
    test( 'Debe retornar el estado por defecto', () => {
        const state = uiReducer( initialState, {} );

        expect( state ).toEqual( initialState );
    } );

    test( 'Debe abrir el modal y retornar openModal en true', () => {
        const state = uiReducer( initialState, {
            type: types.uiOpenModal
        } );

        expect( state ).toEqual( {
            openModal: true
        } );

        initialState = state;
    } );

    test( 'Debe cerrar el modal y retornar openModal en false', () => {
        const state = uiReducer( initialState, {
            type: types.uiCloseModal
        } );

        expect( state ).toEqual( {
            openModal: false
        } );
    } );
} );
