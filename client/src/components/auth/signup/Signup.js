import React, {useEffect} from 'react';
import {Button, Form} from "bootstrap-4-react";
import * as types from "../../../redux/types/auth/authType";
import {useDispatch, useSelector} from "react-redux";
import {signup, signupValidate} from "../../../redux/actions/auth/authAction";

const Signup = () => {

    useEffect(() => {
        dispatch({
            type: types.AUTH_MESSAGE,
            message: '',
        });
    }, []);

    const dispatch = useDispatch();
    const {email, nikname, password, errors, message} = useSelector(state => state.auth);

    const onSubmit = (event) => {
        event.preventDefault();
        let validationErrors = dispatch(signupValidate(email, nikname, password));
        validationErrors.then((valid) => {
            if (valid) {
                dispatch(signup(email, nikname, password));
                dispatch({
                    type: types.AUTH_RESET_FORM
                });
            }
        });
    };

    const onChangeEmail = (event) => {
        dispatch({type: types.AUTH_CHANGE_EMAIL, email: event.target.value});
        dispatch(signupValidate(event.target.value, nikname, password));
    };
    const onChangeNikname = (event) => {
        dispatch({type: types.AUTH_CHANGE_NIKNAME, nikname: event.target.value});
        dispatch(signupValidate(email, event.target.value, password));
    };
    const onChangePassword = (event) => {
        dispatch({type: types.AUTH_CHANGE_PASSWORD, password: event.target.value});
        dispatch(signupValidate(email, nikname, event.target.value));
    };

    return (
        <div>
            <h1>Signup</h1>

            {message ? (
                <div className="alert alert-success" role="alert">
                    <p>{message}</p>
                </div>
            ): null}

            {errors.length > 0 ? (
                <div className="alert alert-danger" role="alert">
                    {errors && errors.map(item => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            ) : null}

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
                        className={errors.email && errors.email.length > 0 ? 'input-error' : ''}
                    />
                    {errors.email && errors.email.length > 0 ? (
                        <div>
                            {errors.email.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}

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
                        className={errors.nikname && errors.nikname.length > 0 ? 'input-error' : ''}
                    />
                    {errors.nikname && errors.nikname.length > 0 ? (
                        <div>
                            {errors.nikname.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}
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
                        className={errors.password && errors.password.length > 0 ? 'input-error' : ''}
                    />
                    {errors.password && errors.password.length > 0 ? (
                        <div>
                            {errors.password.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}
                </Form.Group>
                <Button primary type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Signup;