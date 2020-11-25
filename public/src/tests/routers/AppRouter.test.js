import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppRouter from '../../routers/AppRouter';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( 'Pruebas en AppRouter', () => {
    test( 'Debe mostrar el componente LoadingScreen', () => {
        const store = mockStore( {
            auth: {
                checking: true
            }
        } );

        const wrapper = mount( 
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.spinner-grow' ).exists() ).toBe( true );
    } );

    test( 'Debe mostrar el componente LoginScreen', () => {
        const store = mockStore( {
            auth: {
                checking: false,
                uid: null,
                name: null
            }
        } );

        const wrapper = mount( 
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.form-register' ).exists() ).toBe( true );
    } );

    test( 'Debe mostrar el componente CalendarScreen', () => {
        localStorage.setItem( 'tkca', 'asdasdadfasdfasd1514aedf0ascascda' );

        const store = mockStore( {
            ui: {
                openModal: false
            },
            auth: {
                checking: false,
                uid: 'ABC123',
                name: 'Pepe Ruiz'
            },
            calendar: {
                events: []
            }
        } );

        const wrapper = mount( 
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper.find( '.navbar' ).exists() ).toBe( true );
        expect( wrapper.find( '.calendar-screen' ).exists() ).toBe( true );
    } );
} );
