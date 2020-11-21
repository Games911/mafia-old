import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Signin from "./components/auth/signin/Signin";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/home/Home";
import { Container, Row, Col } from 'bootstrap-4-react';

function App() {
  return (
      <BrowserRouter>
      <div className="App">
        <Header />
        <main>
            <Container>
                <Row>
                    <Col>
                        <Switch>
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
