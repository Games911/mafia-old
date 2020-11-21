import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Button } from 'bootstrap-4-react';
import {Link} from "react-router-dom";
import './Signin.css';

const Signin = () => {

    const dispatch = useDispatch();
    const {email} = useSelector(state => state.auth);

    return (
        <div>
            <h1>Signin</h1>
            <Form>
                <Form.Group>
                    <label htmlFor="signinNikname">Nikname</label>
                    <Form.Input type="text" id="signinNikname" placeholder="Enter nikname" />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="signinPassword">Password</label>
                    <Form.Input type="password" id="signinPassword" placeholder="Password" />
                </Form.Group>
                <Button primary type="submit">Submit</Button>
                <div className="refer-signup">
                    <Form.Text text="muted">If you haven't registered, please do it.  <Link to="/signup">Signup</Link></Form.Text>
                </div>
            </Form>
        </div>
    )
}

export default Signin;