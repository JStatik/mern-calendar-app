import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginScreen from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
jest.mock( '../../../actions/auth', () => (
    {
        startLogin: jest.fn(),
        startRegister: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {} );
store.dispatch = jest.fn();

describe( 'Pruebas en LoginScreen', () => {
    const wrapper = mount( 
        <Provider store={ store }>
            <LoginScreen />
        </Provider>
    );

    beforeEach( () => {
        store.clearActions();
        jest.clearAllMocks();
    } );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar el dispatch startLogin()', () => {
        wrapper.find( 'input[name="loginEmail"]' ).simulate( 'change', {
            target: {
                name: 'loginEmail',
                value: 'pepe@gmail.com'
            }
        } );

        wrapper.find( 'input[name="loginPassword"]' ).simulate( 'change', {
            target: {
                name: 'loginPassword',
                value: '123456'
            }
        } );

        wrapper.find( 'form' ).at( 1 ).simulate( 'submit', {
            preventDefault(){}
        } );

        expect( store.dispatch ).toHaveBeenCalled();
        expect( startLogin ).toHaveBeenCalledWith( 'pepe@gmail.com', '123456' );
    } );

    test( 'No debe ejecutar el dispatch startRegister() por contraseñas diferentes', () => {
        wrapper.find( 'input[name="registerName"]' ).simulate( 'change', {
            target: {
                name: 'registerName',
                value: 'Pepe Ruiz'
            }
        } );

        wrapper.find( 'input[name="registerEmail"]' ).simulate( 'change', {
            target: {
                name: 'registerEmail',
                value: 'pepe@gmail.com'
            }
        } );

        wrapper.find( 'input[name="registerPassword"]' ).simulate( 'change', {
            target: {
                name: 'registerPassword',
                value: '123456'
            }
        } );

        wrapper.find( 'input[name="registerPassword2"]' ).simulate( 'change', {
            target: {
                name: 'registerPassword2',
                value: '1234567'
            }
        } );

        wrapper.find( 'form' ).at( 0 ).simulate( 'submit', {
            preventDefault(){}
        } );

        expect( store.dispatch ).not.toHaveBeenCalled();
        expect( startRegister ).not.toHaveBeenCalled();
    } );
} );
