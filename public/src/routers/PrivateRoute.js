import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ( { isAuthenticated, component: CalendarScreen, ...rest } ) => {
    return (
        <>  
            <Route { ...rest } component={ ( props ) => {
                return ( isAuthenticated ) ? <CalendarScreen { ...props } /> : <Redirect to="/login" />
            } } />
        </>
    )
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

export default PrivateRoute;
