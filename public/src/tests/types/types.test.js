import '@testing-library/jest-dom';
import types from '../../types/types';

describe( 'Pruebas en types', () => {
    test( 'Debe ser igual al objeto types', () => {
        expect( types ).toEqual( {
            uiOpenModal: '[UI] Open Modal',
            uiCloseModal: '[UI] Close Modal',
        
            authLogin: '[Auth] Login',
            authLogout: '[Auth] Logout',
            authCheckingFinish: '[Auth] Finish Cheking Login State',
        
            eventLoad: '[Calendar] Loaded Events',
            eventUpdate: '[Calendar] Updated Event',
            eventDelete: '[Calendar] Deleted Event',
            eventAddNew: '[Calendar] Added New Event',
            eventRemove: '[Calendar] Removed Events',
            eventSetActive: '[Calendar] Seted Active Event',
            eventRemoveActive: '[Calendar] Removed Active Event',
            eventSetDateSlot: '[Calendar] Seted Dates Slot',
            eventRemoveDateSlot: '[Calendar] Removed Dates Slot'
        } );
    } );
} );
