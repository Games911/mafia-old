import React from 'react';
import {Button, Form} from "bootstrap-4-react";
import * as types from "../../../redux/types/authType";
import {useDispatch, useSelector} from "react-redux";
import {signup, signupValidate} from "../../../redux/actions/authAction";

const Signup = () => {

    const dispatch = useDispatch();
    const {email, nikname, password, errors, message} = useSelector(state => state.auth);

    const onSubmit = (event) => {
        event.preventDefault();
        let validationErrors = dispatch(signupValidate(email, nikname, password));
        validationErrors.then((count) => {
            if (count === 0) {
                dispatch(signup(email, nikname, password));
                dispatch({
                    type: types.AUTH_RESET_FORM
                });
            }
        });
    };

    const onChangeEmail = (event) => {
        dispatch({type: types.AUTH_CHANGE_EMAIL, email: event.target.value});
    };
    const onChangeNikname = (event) => {
        dispatch({type: types.AUTH_CHANGE_NIKNAME, nikname: event.target.value});
    };
    const onChangePassword = (event) => {
        dispatch({type: types.AUTH_CHANGE_PASSWORD, password: event.target.value});
    };

    return (
        <div>
            <h1>Signup</h1>

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
                    <label htmlFor="signinEmail">Email address</label>
                    <Form.Input
                        name="email"
                        type="text"
                        id="signinEmail"
                        placeholder="Enter email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <Form.Text text="muted">Email used mostly for reset password.</Form.Text>
                </Form.Group>
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
            </Form>
        </div>
    )
}

export default Signup;