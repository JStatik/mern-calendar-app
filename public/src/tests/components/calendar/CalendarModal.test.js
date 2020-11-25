import React from 'react';
import '@testing-library/jest-dom';
import moment from 'moment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CalendarModal from '../../../components/calendar/CalendarModal';
import { startUpdateEvent, removeActiveEvent, removeDatesSlot, startAddNewEvent } from '../../../actions/calendar';
import { uiCloseModal } from '../../../actions/ui';
jest.mock( '../../../actions/calendar', () => (
    {
        startUpdateEvent: jest.fn(),
        removeActiveEvent: jest.fn(),
        removeDatesSlot: jest.fn(),
        startAddNewEvent: jest.fn()
    }
) );

jest.mock( '../../../actions/ui', () => (
    {
        uiCloseModal: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' );
const nowPlus = now.clone().add( 1, 'hours' );

const store = mockStore( {
    ui: {
        openModal: true
    },
    calendar: {
        activeEvent: {
            start: now.toDate(),
            end: nowPlus.toDate(),
            title: 'Prueba',
            notes: ''
        },
        slotDates: null
    }
} );
store.dispatch = jest.fn();

describe( 'Pruebas en CalendarModal', () => {
    const wrapper = mount( 
        <Provider store={ store }>
            <CalendarModal />
        </Provider>
    );

    beforeEach( () => {
        store.clearActions();
        jest.clearAllMocks();
    } );

    test( 'Debe existir el componente Modal', () => {
        expect( wrapper.find( '.modal' ).exists() ).toBe( true );
        expect( wrapper.find( 'Modal' ).prop( 'isOpen' ) ).toBe( true );
    } );

    test( 'Debe actualizar el evento y cerrar el modal', () => {
        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        } );

        expect( store.dispatch ).toHaveBeenCalled();
        expect( startUpdateEvent ).toHaveBeenCalled();
        expect( startUpdateEvent ).toHaveBeenCalledWith( {
            start: now.toDate(),
            end: nowPlus.toDate(),
            title: 'Prueba',
            notes: ''
        } );
        expect( removeActiveEvent ).toHaveBeenCalled();
        expect( removeDatesSlot ).toHaveBeenCalled();
        expect( uiCloseModal ).toHaveBeenCalled();
    } );

    test( 'Debe mostrar error si al enviar el formulario falta el titulo', () => {
        const store = mockStore( {
            ui: {
                openModal: true
            },
            calendar: {
                activeEvent: {
                    start: now.toDate(),
                    end: nowPlus.toDate(),
                    title: '',
                    notes: ''
                },
                slotDates: null
            }
        } );

        const wrapper = mount( 
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        );

        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        } );

        expect( wrapper.find( 'input[name="title"]' ).hasClass( 'is-invalid' ) ).toBe( true );
    } );

    test( 'Debe crear un nuevo evento', () => {
        const store = mockStore( {
            ui: {
                openModal: true
            },
            calendar: {
                activeEvent: null,
                slotDates: null
            }
        } );
        store.dispatch = jest.fn();

        const wrapper = mount( 
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        );

        wrapper.find( 'input[name="title"]' ).simulate( 'change', {
            target: {
                name: 'title',
                value: 'Título de prueba'
            }
        } );

        wrapper.find( 'form' ).simulate( 'submit', {
            preventDefault(){}
        } );

        expect( store.dispatch ).toHaveBeenCalled();
        expect( startAddNewEvent ).toHaveBeenCalled();
        expect( startAddNewEvent ).toHaveBeenCalledWith( {
            start: expect.any( Date ),
            end: expect.any( Date ),
            title: 'Título de prueba',
            notes: ''
        } );
        expect( removeActiveEvent ).toHaveBeenCalled();
        expect( removeDatesSlot ).toHaveBeenCalled();
        expect( uiCloseModal ).toHaveBeenCalled();
    } );
} );
