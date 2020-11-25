import moment from 'moment';

const prepareEvents = ( events = [] ) => {
    return events.map( event => (
        {
            start: moment( event.start ).toDate(),
            end: moment( event.end ).toDate(),
            title: event.title,
            notes: event.notes,
            user: event.user,
            idEvent: event.id
        }
    ) );
};

export default prepareEvents;
