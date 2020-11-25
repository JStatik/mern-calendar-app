import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../../types/types';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import popUp from '../../helpers/popup';
import * as fetchModule from '../../helpers/fetch';
jest.mock( '../../helpers/popup' );
 
const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {} );

Storage.prototype.setItem = jest.fn();

describe( 'Pruebas en auth', () => {
    let token;

    beforeEach( () => {
        store.clearActions();
        jest.clearAllMocks();
    } );

    test( 'Debe funcionar correctamente el startLogin', async() => {
        await store.dispatch( startLogin( 'pepe@gmail.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[ 0 ].type ).toBe( types.authLogin );
        expect( actions[ 0 ].payload ).toEqual( {
            uid: expect.any( String ),
            name: expect.any( String )
        } );
        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'tkca', expect.any( String ) );

        token = localStorage.setItem.mock.calls[ 0 ][ 1 ];
    } );

    test( 'Debe mostrar el mensaje de error el startLogin al hacer un login incorrecto', async() => {
        await store.dispatch( startLogin( 'pepe@gmail.com', '1234567' ) );

        const actions = store.getActions();

        expect( actions ).toEqual( [] );
        expect( popUp ).toHaveBeenCalled();
        expect( popUp ).toHaveBeenCalledWith( 'error', '#990000', 'Error', 'Alguno de los datos ingresados no es correcto.' );
    } );

    test( 'Debe funcionar correctamente el startRegister', async() => {
        fetchModule.fetchLoginAndRegister = jest.fn( () => (
            {
                json() {
                    return {
                        ok: true,
                        uid: '123',
                        name: 'Paco Reyes',
                        token: 'ABC123ABC123'
                    }
                } 
            }
        ) );

        await store.dispatch( startRegister( 'Paco Reyes', 'paco@gmail.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[ 0 ].type ).toBe( types.authLogin );
        expect( actions[ 0 ].payload ).toEqual( {
            uid: '123',
            name: 'Paco Reyes'
        } );
        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'tkca', 'ABC123ABC123' );
    } );

    test( 'Debe funcionar correctamente el startChecking', async() => {
        fetchModule.fetchRenew = jest.fn( () => (
            {
                json() {
                    return {
                        ok: true,
                        uid: '123',
                        name: 'Paco Reyes',
                        token: token
                    }
                } 
            }
        ) );

        await store.dispatch( startChecking() );

        const actions = store.getActions();

        expect( actions[ 0 ].type ).toBe( types.authLogin );
        expect( actions[ 0 ].payload ).toEqual( {
            uid: '123',
            name: 'Paco Reyes'
        } );
        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'tkca', token );
    } );
} );
