import React, {useEffect} from 'react';
import {Button, Form} from "bootstrap-4-react";
import * as types from "../../../redux/types/auth/authType";
import {useDispatch, useSelector} from "react-redux";
import {emailValidate, niknameValidate, passwordValidate, signin, signup} from "../../../redux/actions/auth/authAction";

const Signup = () => {

    useEffect(() => {
        dispatch({
            type: types.AUTH_RESET_FORM,
            message: '',
        });
    }, []);

    const dispatch = useDispatch();
    const {
        email,
        nikname,
        password,
        errorsEmail,
        errorsNikname,
        errorsPassword,
        changedEmail,
        changedNikname,
        changedPassword,
        apiSuccessMessage,
        apiErrorMessage
    } = useSelector(state => state.auth);

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(signup(email, nikname, password));
        dispatch({
            type: types.AUTH_RESET_FORM
        });
    };

    const isValid = () => {
        if (changedNikname && changedPassword && changedEmail && errorsNikname.length === 0 && errorsPassword.length === 0 && errorsEmail.length === 0) {
            return true;
        }
        return false;
    }

    const onChangeEmail = (event) => {
        dispatch({type: types.AUTH_CHANGE_EMAIL, email: event.target.value});
        dispatch(emailValidate(event.target.value));
    };
    const onChangeNikname = (event) => {
        dispatch({type: types.AUTH_CHANGE_NIKNAME, nikname: event.target.value});
        dispatch(niknameValidate(event.target.value));
    };
    const onChangePassword = (event) => {
        dispatch({type: types.AUTH_CHANGE_PASSWORD, password: event.target.value});
        dispatch(passwordValidate(event.target.value));
    };

    return (
        <div>
            <h1>Signup</h1>

            {apiSuccessMessage ? (
                <div className="alert alert-success" role="alert">
                    <p>{apiSuccessMessage}</p>
                </div>
            ): null}

            {apiErrorMessage ? (
                <div className="alert alert-danger" role="alert">
                    <p>{apiErrorMessage}</p>
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
                        onFocus={onChangeEmail}
                        onChange={onChangeEmail}
                        className={errorsEmail && errorsEmail.length > 0 ? 'input-error' : ''}
                    />
                    {errorsEmail && errorsEmail.length > 0 ? (
                        <div>
                            {errorsEmail.map(item => (
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
                        onFocus={onChangeNikname}
                        onChange={onChangeNikname}
                        className={errorsNikname && errorsNikname.length > 0 ? 'input-error' : ''}
                    />
                    {errorsNikname && errorsNikname.length > 0 ? (
                        <div>
                            {errorsNikname.map(item => (
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
                        className={errorsPassword && errorsPassword.length > 0 ? 'input-error' : ''}
                    />
                    {errorsPassword && errorsPassword.length > 0 ? (
                        <div>
                            {errorsPassword.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}
                </Form.Group>
                <Button primary type="submit" disabled={!isValid()}>Submit</Button>
            </Form>
        </div>
    )
}

export default Signup;