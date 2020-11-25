import React from 'react';

const CalendarEvent = ( event ) => {
    const { title } = event;
    const { user, notes } = event.event;

    return (
        <div>
            <strong>{ title }</strong><span> - { user.name }</span>
            <br/>
            <span><em>{ notes }</em></span>
        </div>
    )
};

export default CalendarEvent;
