import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking, checkingFinish } from '../actions/auth';
import LoadingScreen from '../components/ui/LoadingScreen';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking } = useSelector( store => store.auth );

    const sesion = localStorage.getItem( 'tkca' );

    useEffect( () => {
        sesion ? dispatch( startChecking() ) : dispatch( checkingFinish() );
    }, [ sesion, dispatch ] );

    if( checking ) return <LoadingScreen />;
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={ LoginScreen } isAuthenticated={ !!sesion } />
                    <PrivateRoute exact path="/" component={ CalendarScreen } isAuthenticated={ !!sesion } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
};

export default AppRouter;
