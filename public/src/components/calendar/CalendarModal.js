import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { uiCloseModal } from '../../actions/ui';
import { removeActiveEvent, removeDatesSlot, startAddNewEvent, startUpdateEvent } from '../../actions/calendar';
import useForm from '../../hooks/useForm';
import { isFormValidEvents } from '../../helpers/isFormValid';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate( -50%, -50% )'
    }
};

process.env.NODE_ENV !== 'test' && Modal.setAppElement( '#root' );

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' );
const nowPlus = now.clone().add( 1, 'hours' );

const initialFormValues = {
    start: now.toDate(),
    end: nowPlus.toDate(),
    title: '',
    notes: ''
};

const CalendarModal = () => {
    const dispatch = useDispatch();
    const { openModal } = useSelector( store => store.ui );
    const { activeEvent, slotDates } = useSelector( store => store.calendar );

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus.toDate() );
    const [ msgError, setMsgError ] = useState( null );
    const [ datesValid, setDatesValid ] = useState( true );
    const [ titleValid, setTitleValid ] = useState( true );
   
    const [ formValues, setFormValues, handleInputChange, reset ] = useForm( initialFormValues );
    const { start, end, title, notes } = formValues;

    useEffect( () => {
        if( activeEvent ) {
            const { start, end, title, notes } = activeEvent;

            setFormValues( { start, end, title, notes } );      
            setDateStart( start );
            setDateEnd( end );
        } else if( slotDates ) {
            const { start, end } = slotDates;

            setFormValues( { ...initialFormValues, start: start, end: end } );
            setDateStart( start );
            setDateEnd( end );
        } else {
            setFormValues( initialFormValues );
            setDateStart( now.toDate() );
            setDateEnd( nowPlus.toDate() );
        }
    }, [ setFormValues, activeEvent, slotDates ] );

    const closeModal = () => {
        dispatch( removeActiveEvent() );
        dispatch( removeDatesSlot() );
        dispatch( uiCloseModal() );
        
        setDateStart( now.toDate() );
        setDateEnd( nowPlus.toDate() );

        setMsgError( null );
        setDatesValid( true );
        setTitleValid( true );
        reset();
    };

    const handleStartDateChange = ( event ) => {
        setDateStart( event );
        setFormValues( { ...formValues, start: event } );
    };

    const handleEndDateChange = ( event ) => {
        setDateEnd( event );
        setFormValues( { ...formValues, end: event } );
    };

    const handleSubmit = ( event ) => {
        event.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        const { newMsgError, datesValid, titleValid, isValid } = isFormValidEvents( momentStart, momentEnd, title );

        setMsgError( newMsgError );
        setDatesValid( datesValid );
        setTitleValid( titleValid );

        if( isValid ) {
            if( activeEvent ) {
                dispatch( startUpdateEvent( formValues ) );
            } else {
                dispatch( startAddNewEvent( formValues ) );
            }

            closeModal();
        }
    };

    return (
        <Modal isOpen={ openModal } onRequestClose={ closeModal } closeTimeoutMS={ 200 } style={ customStyles } className="modal animate__animated animate__fadeIn" overlayClassName="modal-fondo" ariaHideApp={ process.env.NODE_ENV === 'test' ? false : true }>
            <h3 className="modal-title">{ activeEvent ? 'Editar evento' : 'Nuevo evento' }</h3>
            <hr/>
            <form className="container" autoComplete="off" onSubmit={ handleSubmit }>
                { msgError && <div className="alert-error">{ msgError }</div> }

                <div className="form-group">
                    <label>Fecha y hora de inicio</label>
                    <DateTimePicker className={ `form-control ${ !datesValid && 'is-invalid' }` } onChange={ handleStartDateChange } value={ dateStart } />
                </div>

                <div className="form-group">
                    <label>Fecha y hora de fin</label>
                    <DateTimePicker className={ `form-control ${ !datesValid && 'is-invalid' }` } onChange={ handleEndDateChange } value={ dateEnd } minDate={ dateStart } />
                </div>
                <hr/>
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input type="text" className={ `form-control ${ !titleValid && 'is-invalid' }` } placeholder="Título del evento" name="title" onChange={ handleInputChange } value={ title }/>
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea type="text" className="form-control" placeholder="Notas" rows="5" name="notes" onChange={ handleInputChange } value={ notes }></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional (Opcional)</small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
};

export default CalendarModal;
