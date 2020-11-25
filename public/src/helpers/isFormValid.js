import validator from 'validator';
import moment from 'moment';

export const isFormValidLogin = ( email, password ) => {
    if( !validator.isEmail( email ) || password.length < 5 ) {
        return {
            newMsgError: 'Alguno de los datos ingresados no es correcto',
            isValid: false
        };
    } else if( !validator.isAlphanumeric( password ) ) {
        return {
            newMsgError: 'Alguno de los datos ingresados no es correcto',
            isValid: false
        };
    } else if ( validator.isEmpty( email ) || validator.isEmpty( password ) ) {
        return {
            newMsgError: 'Alguno de los datos ingresados no es correcto',
            isValid: false
        };
    }

    return { 
        newMsgError: null, 
        isValid: true 
    };
};

export const isFormValidRegister = ( name, email, password, password2 ) => {
    if( name.trim().length === 0 || name.trim().length < 2 || validator.isEmpty( name ) ) {
        return {
            newMsgErrorName: 'Ingrese un nombre válido',
            newMsgErrorEmail: null,
            newMsgErrorPassword: null,
            isValid: false
        };
    } else if( !validator.isEmail( email ) || validator.isEmpty( email ) ) {
        return {
            newMsgErrorName: null,
            newMsgErrorEmail: 'El email no es válido',
            newMsgErrorPassword: null,
            isValid: false
        };
    } else if( password !== password2 || !validator.equals( password, password2 ) ) {
        return {
            newMsgErrorName: null,
            newMsgErrorEmail: null,
            newMsgErrorPassword: 'Las contraseñas no coinciden',
            isValid: false
        };
    } else if( password.length < 5 || validator.isEmpty( password ) ) {
        return {
            newMsgErrorName: null,
            newMsgErrorEmail: null,
            newMsgErrorPassword: 'La contraseña debe tener al menos 6 caracteres',
            isValid: false
        };
    } else if( !validator.isAlphanumeric( password ) ) {
        return {
            newMsgErrorName: null,
            newMsgErrorEmail: null,
            newMsgErrorPassword: 'La contraseña no debe tener caracteres especiales',
            isValid: false
        };
    }

    return { 
        newMsgErrorName: null,
        newMsgErrorEmail: null,
        newMsgErrorPassword: null,
        isValid: true 
    };
};

export const isFormValidEvents = ( start, end, title ) => {
    if( title.trim().length === 0 || title.trim().length < 2 || validator.isEmpty( title ) ) {
        return {
            newMsgError: 'Ingrese un título válido',
            datesValid: true,
            titleValid: false,
            isValid: false
        };
    } else if( moment( start ).isSameOrAfter( end ) ) {
        return {
            newMsgError: 'La fecha de fin debe ser mayor a la fecha de inicio',
            datesValid: false,
            titleValid: true,
            isValid: false
        };
    } else if( !moment( start ).isValid() || !moment( end ).isValid() ) {
        return {
            newMsgError: 'Ingrese fechas válidas',
            datesValid: false,
            titleValid: true,
            isValid: false
        };
    }

    return { 
        newMsgError: null,
        datesValid: true,
        titleValid: true,
        isValid: true 
    };
};
