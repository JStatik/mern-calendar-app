import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="container-spinner">
            <div className="spinner-grow text-dark" style={ { width: '4rem', height: '4rem' } } role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};

export default LoadingScreen;
