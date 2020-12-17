import React from 'react';
import { Route, Redirect } from "react-router-dom";
import NotAllowed from "../components/home/NotAllowed";


const GuardedRoute = ({ component: Component, auth }) => {

    return (
        <Route render={() => (
            auth !== null
                ? <Component/>
                : <NotAllowed />
                )
        }/>
    );

};

export default GuardedRoute;