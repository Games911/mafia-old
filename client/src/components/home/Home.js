import React from 'react';
import {Link} from "react-router-dom";
import { Button } from 'bootstrap-4-react';
import { io } from "socket.io-client";

const Home = () => {
    const socket = io("http://localhost:8888");
    socket.on("connect", () => {
        console.log(socket.id);
    });
    socket.on("init", (data) => {
        console.log(data);
    });

    const start = () => {
        socket.emit("hello", "world");
    };


    return (
        <div>
            <h1>Home</h1>
            <ul>
                <li><Link to="/cabinet">Cabinet</Link></li>
            </ul>
            <Button primary type="submit" onClick={start}>Submit</Button>
        </div>
    )
}

export default Home;