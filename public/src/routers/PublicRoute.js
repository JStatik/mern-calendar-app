import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ( { isAuthenticated, component: LoginScreen, ...rest } ) => {
    return (
        <>
            <Route { ...rest } component={ ( props ) => {
                return ( !isAuthenticated ) ? <LoginScreen { ...props } /> : <Redirect to="/" />
            } } />
        </>
    )
};

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

export default PublicRoute;
