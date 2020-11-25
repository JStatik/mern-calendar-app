import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteEvent from '../../../components/ui/DeleteEvent';
import { startDeleteEvent } from '../../../actions/calendar';
jest.mock( '../../../actions/calendar', () => (
    {
        startDeleteEvent: jest.fn()
    }
) );

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const store = mockStore( {} );
store.dispatch = jest.fn();

describe( 'Pruebas en DeleteEvent', () => {
    const wrapper = mount( 
        <Provider store={ store }>
            <DeleteEvent />
        </Provider>
    );

    test( 'Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'Debe ejecutar el dispatch de la accion startDeleteEvent()', () => {
        wrapper.find( 'button' ).simulate( 'click' );

        expect( store.dispatch ).toHaveBeenCalled();
        expect( startDeleteEvent ).toHaveBeenCalled();
    } );
} );
