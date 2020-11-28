import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Button } from 'bootstrap-4-react';
import {Link} from "react-router-dom";
import './Signin.css';
import * as types from "../../../redux/types/auth/authType";
import {
    niknameValidate,
    passwordValidate,
    signin
} from "../../../redux/actions/auth/authAction";

const Signin = () => {

    const dispatch = useDispatch();
    const {
        nikname,
        password,
        errorsNikname,
        errorsPassword,
        changedNikname,
        changedPassword,
        apiSuccessMessage,
        apiErrorMessage
    } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch({
            type: types.AUTH_RESET_FORM,
            message: '',
        });
    }, []);

    const isValid = () => {
        if (changedNikname && changedPassword && errorsNikname.length === 0 && errorsPassword.length === 0) {
            return true;
        }
        return false;
    }

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(signin(nikname, password));
        dispatch({
            type: types.AUTH_RESET_FORM
        });
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
            <h1>Signin</h1>

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
                <div className="refer-signup">
                    <Form.Text text="muted">If you haven`&apos;`t registered, please do it.&nbsp;<Link to="/signup">Signup</Link></Form.Text>
                </div>
            </Form>
        </div>
    )
}

export default Signin;