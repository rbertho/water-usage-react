import React from 'react';

function NotFound() {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <div className="p-5 bg-white rounded shadow w-50">
                <h1 className="mb-3">Not Found!!</h1>
                <p className="lead">HTTP 404</p>

                <a href="/">Home</a>
            </div>
        </div>
    );
}

export default NotFound;