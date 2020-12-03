import React from 'react';
import './Headers.css';
import { Navbar, Collapse, Container, Row, Col } from 'bootstrap-4-react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Container>
                <Row>
                    <Col col="sm">
                        <Navbar expand="lg" dark>
                            <Link to="/">Mafia</Link>
                            <Navbar.Toggler target="#navbarNav" />
                            <Collapse navbar id="navbarNav">
                                <Navbar.Nav>
                                    <Link to="/signin" className="active nav-link">Signin</Link>
                                </Navbar.Nav>
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;