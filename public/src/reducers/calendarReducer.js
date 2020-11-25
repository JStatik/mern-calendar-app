import types from '../types/types';

const initialState = {
    events: [],
    activeEvent: null,
    slotDates: null
};

const calendarReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.eventRemoveActive:
            return {
                ...state,
                activeEvent: null
            };

        case types.eventLoad:
            return {
                ...state,
                events: action.payload
            };

        case types.eventAddNew:
            return {
                ...state,
                events: [ action.payload, ...state.events ]
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map( ( event ) => (
                    event.idEvent === action.payload.idEvent ? action.payload : event
                ) )
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter( ( event ) => (
                    event.idEvent !== state.activeEvent.idEvent
                ) ),
                activeEvent: null
            }

        case types.eventRemoveDateSlot:
            return {
                ...state,
                slotDates: null
            }

        case types.eventSetDateSlot:
            return {
                ...state,
                slotDates: action.payload
            }

        case types.eventRemove:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default calendarReducer;
