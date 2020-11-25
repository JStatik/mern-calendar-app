import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from '../reducers/uiReducer';
import authReducer from '../reducers/authReducer';
import calendarReducer from '../reducers/calendarReducer';

const composeEnhancers = ( ( process.env.NODE_ENV !== 'production' ) && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

const reducers = {
    ui: uiReducer,
    auth: authReducer,
    calendar: calendarReducer
};

const store = createStore( combineReducers( reducers ), composeEnhancers( applyMiddleware( thunk ) ) );

export default store;
