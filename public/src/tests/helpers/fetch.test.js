import '@testing-library/jest-dom';
import { fetchEvents, fetchLoginAndRegister } from '../../helpers/fetch';

describe( 'Pruebas en fetch', () => {
    let token = '';

    test( 'Debe retornar la respuesta correcta al hacer un login', async() => {
        const peticion = await fetchLoginAndRegister( '/auth', { email: 'pepe@gmail.com', password: '123456' } );

        expect( peticion instanceof Response ).toBe( true );

        const usuario = await peticion.json();

        expect( usuario.ok ).toBe( true );

        token = usuario.token;
    } );

    test( 'Debe retornar la respuesta correcta al obtener los eventos', async() => {
        const peticion = await fetchEvents( '/events', 'GET', token );

        expect( peticion instanceof Response ).toBe( true );

        const eventos = await peticion.json();

        expect( eventos.ok ).toBe( true );
    } );
} );
