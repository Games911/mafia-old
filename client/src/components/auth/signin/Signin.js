import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Button } from 'bootstrap-4-react';
import {Link} from "react-router-dom";
import './Signin.css';
import * as types from "../../../redux/types/authType";
import {signin, signinValidate} from "../../../redux/actions/authAction";

const Signin = () => {

    const dispatch = useDispatch();
    const {nikname, password, errors, message} = useSelector(state => state.auth);

    const onSubmit = (event) => {
        event.preventDefault();
        let validationErrors = dispatch(signinValidate(nikname, password));
        validationErrors.then((count) => {
            if (count === 0) {
                dispatch(signin(nikname, password));
                dispatch({
                    type: types.AUTH_RESET_FORM
                });
            }
        });
    };

    const onChangeNikname = (event) => {
        dispatch({type: types.AUTH_CHANGE_NIKNAME, nikname: event.target.value});
    };
    const onChangePassword = (event) => {
        dispatch({type: types.AUTH_CHANGE_PASSWORD, password: event.target.value});
    };

    return (
        <div>
            <h1>Signin</h1>

            {errors.length > 0 ? (
                <div className="alert alert-danger" role="alert">
                    {errors && errors.map(item => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            ) : null}

            {message ? (
                <div className="alert alert-success" role="alert">
                    <p>{message}</p>
                </div>
            ): null}

            <Form type="POST" onSubmit={onSubmit} action="#">
                <Form.Group>
                    <label htmlFor="signinNikname">Nikname</label>
                    <Form.Input
                        name="nikname"
                        type="text"
                        id="signinNikname"
                        placeholder="Enter nikname"
                        value={nikname}
                        onChange={onChangeNikname}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="signinPassword">Password</label>
                    <Form.Input
                        name="password"
                        type="password"
                        id="signinPassword"
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                    />
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