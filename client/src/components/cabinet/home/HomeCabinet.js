import React from 'react';
import './HomeCabinet.css';
import { Card } from 'bootstrap-4-react';

const HomeCabinet = () => {
    return (
        <div className="rooms-list">
            <h1>Home Cabinet</h1>
            <a href="#">
                <Card text="center">
                    <Card.Header>Free</Card.Header>
                    <Card.Body>
                        <Card.Title>Room 1</Card.Title>
                    </Card.Body>
                    <Card.Footer text="muted">2 users</Card.Footer>
                </Card>
            </a>
            <a href="#">
                <Card text="center">
                    <Card.Header>Free</Card.Header>
                    <Card.Body>
                        <Card.Title>Room 1</Card.Title>
                    </Card.Body>
                    <Card.Footer text="muted">2 users</Card.Footer>
                </Card>
            </a>
            <a href="#">
                <Card text="center">
                    <Card.Header>Free</Card.Header>
                    <Card.Body>
                        <Card.Title>Room 1</Card.Title>
                    </Card.Body>
                    <Card.Footer text="muted">2 users</Card.Footer>
                </Card>
            </a>
        </div>
    )
}

export default HomeCabinet;