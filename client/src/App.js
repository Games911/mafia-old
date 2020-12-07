import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Signin from "./components/auth/signin/Signin";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/home/Home";
import HomeCabinet from './components/cabinet/home/HomeCabinet';
import { Container, Row, Col } from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import GuardedRoute from "./guards/GuardedRoute";
import {getToken} from "./redux/actions/auth/tokenAction";
import RoomCabinet from "./components/cabinet/room/RoomCabinet";

function App() {

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.token);
    useEffect(() => {
        dispatch(getToken());
    }, [token]);

    return (
      <BrowserRouter>
      <div className="App">
        <Header token={token}/>
        <main>
            <Container>
                <Row>
                    <Col>
                        <Switch>
                            <GuardedRoute path='/cabinet/room' component={RoomCabinet} auth={token} />
                            <GuardedRoute path='/cabinet' component={HomeCabinet} auth={token} />
                            <Route path="/signin">
                                <Signin />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </main>
      </div>
      </BrowserRouter>
    );
}

export default App;
