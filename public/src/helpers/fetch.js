const urlBase = process.env.REACT_APP_API_URL;

export const fetchLoginAndRegister = ( endpoint, data ) => {
    const url = `${ urlBase }${ endpoint }`;

    return fetch( url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify( data )
    } );
};

export const fetchRenew = ( endpoint, token ) => {
    const url = `${ urlBase }${ endpoint }`;

    return fetch( url, {
        method: 'GET',
        headers: {
            'x-token': token
        },
    } );
};

export const fetchEvents = ( endpoint, method, token, data ) => {
    const url = `${ urlBase }${ endpoint }`;

    if( method === 'POST' || method === 'PUT' ) {
        return fetch( url, {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        } );
    }

    return fetch( url, {
        method: method,
        headers: {
            'x-token': token
        },
    } );
};
