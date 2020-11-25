import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

const Navbar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector( store => store.auth );

    const handleLogout = () => {
        dispatch( startLogout() );
    };

    return (
        <nav className="navbar navbar-light" style={ { background: '#572364' } }>
            <span className="navbar-brand text-white">{ name }</span>

            <button className="btn btn-outline-danger" onClick={ handleLogout }>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </nav>
    )
};

export default Navbar;
