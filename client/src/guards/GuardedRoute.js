import React from 'react';
import { Route } from "react-router-dom";
import NotAllowed from "../components/home/NotAllowed";


const GuardedRoute = ({ component: Component, auth, socket }) => {

    return (
        <Route render={() => (
            auth !== null
                ? <Component socket={socket}/>
                : <NotAllowed />
                )
        }/>
    );

};

export default GuardedRoute;