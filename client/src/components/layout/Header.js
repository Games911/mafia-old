import React, {useEffect} from 'react';
import './Headers.css';
import { Navbar, Collapse, Container, Row, Col } from 'bootstrap-4-react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeToken} from "../../redux/actions/auth/tokenAction";
import {getUserData, clearUserData} from "../../redux/actions/auth/userInfoAction";

const Header = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const {
        userNikname
    } = useSelector(state => state.userInfoReducer);

    useEffect(() => {
        dispatch(getUserData());
    }, [userNikname]);

    const logout = () => {
        dispatch(clearUserData());
        dispatch(removeToken());
        history.push('/');
    };

    const userInfo = () => {
        return (props.token !== null)
            ? (
                <Navbar.Nav>
                    <Link to="#" onClick={logout} className="active nav-link">({userNikname}) Log Out</Link>
                </Navbar.Nav>
            )
            : (
                <Navbar.Nav>
                    <Link to="/signin" className="active nav-link">Signin</Link>
                </Navbar.Nav>
            );
    }

    return (
        <header>
            <Container>
                <Row>
                    <Col col="sm">
                        <Navbar expand="lg" dark>
                            <Link to="/">Mafia</Link>
                            <Navbar.Toggler target="#navbarNav" />
                            <Collapse navbar id="navbarNav">
                                {userInfo()}
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;