import React from 'react';
import {Link} from "react-router-dom";
import { Button } from 'bootstrap-4-react';

const Home = () => {

    const ws = new WebSocket('ws://localhost:9999');

    const onEvent = () => {
        ws.send(JSON.stringify({route: 'check', type: "login"}));
        ws.onopen = () => {
            console.log('Connected')
        };
        ws.onmessage = res => {
            const data = JSON.parse(res.data);
            console.log(data);
        }
        ws.onclose = () => {
            console.log('Close');
        };
    };

    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li><Link to="/cabinet">Cabinet</Link></li>
                <Button primary onClick={onEvent}>Show more</Button>
            </ul>
        </div>
    )
}

export default Home;