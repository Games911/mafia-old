import React from 'react';
import { Route, Redirect } from "react-router-dom";


const GuardedRoute = ({ component: Component, auth }) => {

    return (
        <Route render={() => (
            console.log(auth),
            auth !== null
                ? <Component/>
                : <Redirect to='/'/>
                )
        }/>
    );

};

export default GuardedRoute;