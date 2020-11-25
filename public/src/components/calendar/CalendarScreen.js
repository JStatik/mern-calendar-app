import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { uiOpenModal } from '../../actions/ui';
import { removeActiveEvent, setActiveEvent, setDatesSlot, startLoadEvents } from '../../actions/calendar';
import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import AddNewEvent from '../ui/AddNewEvent';
import DeleteEvent from '../ui/DeleteEvent';
import CalendarModal from './CalendarModal';
import messages from '../../helpers/calendar_messages_es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale( 'es' );

const localizer = momentLocalizer( moment );

const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector( store => store.auth );
    const { events, activeEvent } = useSelector( store => store.calendar );

    const [ viewCalendar, setViewCalendar ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    useEffect( () => {
        dispatch( startLoadEvents() );
    }, [ dispatch ] );

    const onViewCurrent = ( event ) => {
        setViewCalendar( event );
        localStorage.setItem( 'lastView', event );
    };

    const onSelect = ( event ) => {
        dispatch( setActiveEvent( event ) );
    };

    const onDoubleClick = () => {
        dispatch( uiOpenModal() );
    };

    const onSelectSlot = ( event ) => {
        dispatch( removeActiveEvent() );

        if( event.action === 'doubleClick' ) {
            let { start, end } = event;

            end = moment( end ).add( 1, 'hours' ).toDate();

            dispatch( setDatesSlot( start, end ) );
            dispatch( uiOpenModal() );
        }
    };

    const eventStyleGetter = ( event ) => {
        const style = {
            background: event.user.uid === uid ? '#2F2140' : '#7F69A5',
            color: '#ffffff',
            opacity: 0.85
        }

        return { style: style }
    };

    return (
        <div className="calendar-screen animate__animated animate__fadeIn">
            <Navbar />

            <Calendar 
                localizer={ localizer } 
                events={ events } 
                startAccessor="start" 
                endAccessor="end" 
                messages={ messages } 
                view={ viewCalendar } 
                components={ { event: CalendarEvent } } 
                eventPropGetter={ eventStyleGetter } 
                onView={ onViewCurrent } 
                onSelectEvent={ onSelect } 
                onDoubleClickEvent={ onDoubleClick } 
                onSelectSlot={ onSelectSlot } 
                selectable={ true } 
            />

            <AddNewEvent />
            { activeEvent && <DeleteEvent /> }

            <CalendarModal />
        </div>
    )
};

export default CalendarScreen;
