import React from 'react';
import { useDispatch } from 'react-redux';
import { removeActiveEvent } from '../../actions/calendar';
import { uiOpenModal } from '../../actions/ui';

const AddNewEvent = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( removeActiveEvent() );
        dispatch( uiOpenModal() );
    };

    return (
        <button className="btn btn-primary fab" onClick={ handleClick }><i className="fa fa-plus"></i></button>
    )
};

export default AddNewEvent;
