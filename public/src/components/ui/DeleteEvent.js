import React from 'react';
import { useDispatch } from 'react-redux';
import { startDeleteEvent } from '../../actions/calendar';

const DeleteEvent = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( startDeleteEvent() );
    };

    return (
        <button className="btn btn-danger fab-danger" onClick={ handleClick }><i className="fa fa-trash"></i></button>
    )
};

export default DeleteEvent;
