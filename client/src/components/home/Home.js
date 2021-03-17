import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const ws = new WebSocket('ws://localhost:8888');

    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li><Link to="/cabinet">Cabinet</Link></li>
            </ul>
        </div>
    )
}

export default Home;