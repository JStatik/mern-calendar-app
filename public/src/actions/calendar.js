import { fetchEvents } from "../helpers/fetch";
import popUp from "../helpers/popup";
import prepareEvents from "../helpers/prepareEvents";
import types from "../types/types";

export const startLoadEvents = () => {
    return async( dispatch ) => {
        const token = localStorage.getItem( 'tkca' ) || '';

        try {
            const peticion = await fetchEvents( '/events', 'GET', token );
            const eventos = await peticion.json();

            const eventosPreparados = prepareEvents( eventos.eventos );

            dispatch( loadEvents( eventosPreparados ) );
        } catch( error ) {
            popUp( 'error', '#990000', 'Error', 'No se pudo obtener los eventos, intente nuevamente.' );
        }
    };
};

export const startDeleteEvent = () => {
    return async( dispatch, getState ) => {
        const { idEvent } = getState().calendar.activeEvent;
        const token = localStorage.getItem( 'tkca' ) || '';

        try {
            const peticion = await fetchEvents( `/events/${ idEvent }`, 'DELETE', token );
            const evento = await peticion.json();

            if( evento.ok ) {
                dispatch( deleteEvent() );
            } else {
                dispatch( removeActiveEvent() );
                popUp( 'error', '#990000', 'Error', 'No tiene privilegios de eliminación sobre este evento' );
            }
        } catch( error ) {
            popUp( 'error', '#990000', 'Error', 'No se pudo eliminar el evento, intente nuevamente.' );
        }
    };
};

export const startUpdateEvent = ( event ) => {
    return async( dispatch, getState ) => {
        const { idEvent } = getState().calendar.activeEvent;
        const token = localStorage.getItem( 'tkca' ) || '';

        try {
            const peticion = await fetchEvents( `/events/${ idEvent }`, 'PUT', token, event );
            const evento = await peticion.json();

            if( evento.ok ) {
                event.user = evento.evento.user;
                event.idEvent = evento.evento.id;

                dispatch( updateEvent( event ) );
            } else {
                popUp( 'error', '#990000', 'Error', 'No tiene privilegios de edición sobre este evento' );
            }
        } catch( error ) {
            popUp( 'error', '#990000', 'Error', 'No se pudo actualizar el evento, intente nuevamente.' );
        }
    };
};

export const startAddNewEvent = ( event ) => {
    return async( dispatch ) => {
        const token = localStorage.getItem( 'tkca' ) || '';

        try {
            const peticion = await fetchEvents( '/events', 'POST', token, event );
            const evento = await peticion.json();

            if( evento.ok ) {
                event.user = evento.evento.user;
                event.idEvent = evento.evento.id;

                dispatch( addNewEvent( event ) );
            }
        } catch( error ) {
            popUp( 'error', '#990000', 'Error', 'No se pudo crear el evento, intente nuevamente.' );
        }
    };
};

const loadEvents = ( events ) => (
    {
        type: types.eventLoad,
        payload: events
    }
);

const deleteEvent = () => (
    {
        type: types.eventDelete
    }
);

const updateEvent = ( event ) => (
    {
        type: types.eventUpdate,
        payload: event
    }
);

const addNewEvent = ( event ) => (
    {
        type: types.eventAddNew,
        payload: event
    }
);

export const removeActiveEvent = () => (
    {
        type: types.eventRemoveActive
    }
);

export const setActiveEvent = ( event ) => (
    {
        type: types.eventSetActive,
        payload: event
    }
);

export const removeDatesSlot = () => (
    {
        type: types.eventRemoveDateSlot
    }
);

export const setDatesSlot = ( startSlot, endSlot ) => (
    {
        type: types.eventSetDateSlot,
        payload: {
            start: startSlot,
            end: endSlot
        }
    }
);

export const removeEventsLogout = () => (
    {
        type: types.eventRemove
    }
);
