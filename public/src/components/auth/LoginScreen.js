import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import { isFormValidLogin, isFormValidRegister } from '../../helpers/isFormValid';
import { startLogin, startRegister } from '../../actions/auth';
import './login.css';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const [ disabled, setDisabled ] = useState( false );
    const [ msgErrorLogin, setMsgErrorLogin ] = useState( null );
    const [ msgErrorRegisterName, setMsgErrorRegisterName ] = useState( null );
    const [ msgErrorRegisterEmail, setMsgErrorRegisterEmail ] = useState( null );
    const [ msgErrorRegisterPassword, setMsgErrorRegisterPassword ] = useState( null );

    const [ formLoginValues, setFormLoginValues, handleLoginInputChange, resetLogin ] = useForm( { loginEmail: '', loginPassword: '' } );
    const { loginEmail, loginPassword } = formLoginValues;

    const [ formRegisterValues, setFormRegisterValues, handleRegisterInputChange, resetRegister ] = useForm( { registerName: '', registerEmail: '', registerPassword: '', registerPassword2: '' } );
    const { registerName, registerEmail, registerPassword, registerPassword2 } = formRegisterValues;

    const handleLoginSubmit = ( event ) => {
        event.preventDefault();

        const { newMsgError, isValid } = isFormValidLogin( loginEmail, loginPassword );
        setMsgErrorLogin( newMsgError );

        if( isValid ) {
            setDisabled( true );

            dispatch( startLogin( loginEmail, loginPassword ) );

            setDisabled( false );
        }

        resetLogin();
    };

    const handleRegisterSubmit = ( event ) => {
        event.preventDefault();

        const { newMsgErrorName, newMsgErrorEmail, newMsgErrorPassword, isValid } = isFormValidRegister( registerName, registerEmail, registerPassword, registerPassword2 );
        setMsgErrorRegisterName( newMsgErrorName );
        setMsgErrorRegisterEmail( newMsgErrorEmail );
        setMsgErrorRegisterPassword( newMsgErrorPassword );

        if( isValid ) {
            setDisabled( true );

            dispatch( startRegister( registerName, registerEmail, registerPassword ) );

            setDisabled( false );

            resetRegister();
        }
    };

    const handleClickSignUp = () => {
        setDisabled( true );

        document.getElementById( 'container' ).classList.add( 'right-panel-active' );
        setFormLoginValues( { loginEmail: '', loginPassword: '' } );
        setMsgErrorLogin( null );

        setDisabled( false );
    };

    const handleClickSignIn = () => {
        setDisabled( true );

        document.getElementById( 'container' ).classList.remove( 'right-panel-active' );
        setFormRegisterValues( { registerName: '', registerEmail: '', registerPassword: '', registerPassword2: '' } );
        setMsgErrorRegisterName( null );
        setMsgErrorRegisterEmail( null );
        setMsgErrorRegisterPassword( null );

        setDisabled( false );
    };

    return (
        <div className="form-register">
            <div className="container-login animate__animated animate__fadeIn" id="container">
                <div className="form-container sign-up-container">
                    <form className="form" autoComplete="off" onSubmit={ handleRegisterSubmit }>
                        <h3>Register</h3>
                        { msgErrorRegisterName && <div className="alert-error">{ msgErrorRegisterName }</div> }
                        { msgErrorRegisterEmail && <div className="alert-error">{ msgErrorRegisterEmail }</div> }
                        { msgErrorRegisterPassword && <div className="alert-error">{ msgErrorRegisterPassword }</div> }
                        <input type="text" placeholder="Nombre" className={ `form-control input-login ${ msgErrorRegisterName && 'is-invalid' }` } name="registerName" value={ registerName } onChange={ handleRegisterInputChange }/>
                        <input type="email" placeholder="Email" className={ `form-control input-login ${ msgErrorRegisterEmail && 'is-invalid' }` } name="registerEmail" value={ registerEmail } onChange={ handleRegisterInputChange }/>
                        <input type="password" placeholder="Contraseña" className={ `form-control input-login ${ msgErrorRegisterPassword && 'is-invalid' }` } name="registerPassword" value={ registerPassword } onChange={ handleRegisterInputChange }/>
                        <input type="password" placeholder="Repetir contraseña" className={ `form-control input-login ${ msgErrorRegisterPassword && 'is-invalid' }` } name="registerPassword2" value={ registerPassword2 } onChange={ handleRegisterInputChange }/>
                        <button className="btn-form" disabled={ disabled }>Crear cuenta</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form className="form" autoComplete="off" onSubmit={ handleLoginSubmit }>
                        <h3>Login</h3>
                        { msgErrorLogin && <div className="alert-error">{ msgErrorLogin }</div> }
                        <input type="email" placeholder="Email" className={ `form-control input-login ${ msgErrorLogin && 'is-invalid' }` } name="loginEmail" value={ loginEmail } onChange={ handleLoginInputChange }/>
                        <input type="password" placeholder="Contraseña" className={ `form-control input-login ${ msgErrorLogin && 'is-invalid' }` } name="loginPassword" value={ loginPassword } onChange={ handleLoginInputChange }/>
                        <button className="btn-form" disabled={ disabled }>Ingresar</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h4>¡Bienvenido!</h4>
                            <p>Para mantenerse conectado con nosotros, inicie sesión</p>
                            <button className="btn-form ghost" id="signIn" onClick={ handleClickSignIn } disabled={ disabled }>Login</button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h4>¡Hola!</h4>
                            <p>Ingrese sus datos y comience su viaje con nosotros</p>
                            <button className="btn-form ghost" id="signUp" onClick={ handleClickSignUp } disabled={ disabled }>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginScreen;
