import React from 'react';
import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import messages from '../../../helpers/calendar_messages_es';
import { uiOpenModal } from '../../../actions/ui';
import { setActiveEvent } from '../../../actions/calendar';
jest.mock( '../../../actions/ui', () => (
    {
        uiOpenModal: jest.fn()
    }
) );

jest.mock( '../../../actions/calendar', () => (
    {
        startLoadEvents: jest.fn(),
        setActiveEvent: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {
    ui: {
        openModal: false
    },
    auth: {
        uid: '123'
    },
    calendar: {
        events: []
    }
} );
store.dispatch = jest.fn();

Storage.prototype.setItem = jest.fn();

describe( 'Pruebas en CalendarScreen', () => {
    const wrapper = mount( 
        <Provider store={ store }>
            <CalendarScreen />
        </Provider>
    );

    beforeEach( () => {
        store.clearActions();
        jest.clearAllMocks();
    } );

    test( 'Debe existir la clase calendar-screen que contiene todo el calendario', () => {
        expect( wrapper.find( '.calendar-screen' ).exists() ).toBe( true );
    } );

    test( 'Debe abrir el modal al hacer doble click', () => {
        const calendario = wrapper.find( 'Calendar' );

        const mensajesCalendario = calendario.prop( 'messages' );
        expect( mensajesCalendario ).toEqual( messages );

        calendario.prop( 'onDoubleClickEvent' )();
        expect( store.dispatch ).toHaveBeenCalled();
        expect( uiOpenModal ).toHaveBeenCalled();
    } );

    test( 'Debe seleccionar un evento al hacer click', () => {
        const calendario = wrapper.find( 'Calendar' );

        const evento = {
            idEvent: '123',
            start: '22/11/2020',
            end: '23/11/2020',
            title: 'Prueba',
            notes: '',
            user: {
                uid: 'ABC123',
                name: 'Pepe Ruiz'
            }
        };

        calendario.prop( 'onSelectEvent' )( evento );
        expect( store.dispatch ).toHaveBeenCalled();
        expect( setActiveEvent ).toHaveBeenCalledWith( evento );
    } );

    test( 'Debe guardar en el localStorage la ultima vista usada por el usuario', () => {
        const calendario = wrapper.find( 'Calendar' );

        act( () => {
            calendario.prop( 'onView' )( 'week' );
            expect( localStorage.setItem ).toHaveBeenCalled();
            expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastView', 'week' );
        } );
    } );
} );
