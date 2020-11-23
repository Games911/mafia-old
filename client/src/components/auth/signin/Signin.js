import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Button } from 'bootstrap-4-react';
import {Link} from "react-router-dom";
import './Signin.css';
import * as types from "../../../redux/types/auth/authType";
import {signin, signinValidate, signupValidate} from "../../../redux/actions/auth/authAction";

const Signin = () => {

    const dispatch = useDispatch();
    const {nikname, password, errors, message} = useSelector(state => state.auth);

    const onSubmit = (event) => {
        event.preventDefault();
        let validationErrors = dispatch(signinValidate(nikname, password));
        validationErrors.then((valid) => {
            if (valid) {
                dispatch(signin(nikname, password));
                dispatch({
                    type: types.AUTH_RESET_FORM
                });
            }
        });
    };

    const onChangeNikname = (event) => {
        dispatch({type: types.AUTH_CHANGE_NIKNAME, nikname: event.target.value});
        dispatch(signinValidate(event.target.value, password));
    };
    const onChangePassword = (event) => {
        dispatch({type: types.AUTH_CHANGE_PASSWORD, password: event.target.value});
        dispatch(signinValidate(nikname, event.target.value));
    };

    return (
        <div>
            <h1>Signin</h1>

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
                    <label htmlFor="signinNikname">Nikname</label>
                    <Form.Input
                        name="nikname"
                        type="text"
                        id="signinNikname"
                        placeholder="Enter nikname"
                        value={nikname}
                        onFocus={onChangeNikname}
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
                        onFocus={onChangePassword}
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
                <div className="refer-signup">
                    <Form.Text text="muted">If you haven't registered, please do it.  <Link to="/signup">Signup</Link></Form.Text>
                </div>
            </Form>
        </div>
    )
}

export default Signin;