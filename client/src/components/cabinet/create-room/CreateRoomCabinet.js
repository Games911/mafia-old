import React, {useEffect} from 'react';
import './CreateRoomCabinet.css';
import { Form, Button, Breadcrumb } from 'bootstrap-4-react';
import * as types from "../../../redux/types/room/createRoomType";
import {createRoom, nameValidate} from "../../../redux/actions/room/createRoomAction";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../../redux/actions/auth/userInfoAction";
import {Link} from "react-router-dom";


const CreateRoomCabinet = (props) => {
    const dispatch = useDispatch();
    const {
        name,
        errorsName,
        changedName,
        apiErrorMessage
    } = useSelector(state => state.createRoomReducer);
    const { userId } = useSelector(state => state.userInfoReducer);
    const {token} = useSelector(state => state.token);

    useEffect(() => {
        dispatch(getUserData());
    }, [userId]);

    const isValid = () => {
        if (changedName && errorsName.length === 0) {
            return true;
        }
        return false;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(createRoom(name, userId, token, props.socket));
        dispatch({
            type: types.CREATE_ROOM_RESET_FORM
        });
    };

    const onChangeName = (event) => {
        dispatch({type: types.CREATE_ROOM_CHANGE_NAME, name: event.target.value});
        dispatch(nameValidate(event.target.value));
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/cabinet/">Cabinet</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active aria-current="page">Create room</Breadcrumb.Item>
                </Breadcrumb>
            </nav>

            {apiErrorMessage ? (
                <div className="alert alert-danger" role="alert">
                    <p>{apiErrorMessage}</p>
                </div>
            ): null}

            <Form type="POST" onSubmit={onSubmit} action="#">
                <Form.Group>
                    <label htmlFor="createRoomName">Name</label>
                    <Form.Input
                        name="name"
                        type="text"
                        id="createRoomName"
                        placeholder="Enter name"
                        value={name}
                        onFocus={onChangeName}
                        onChange={onChangeName}
                        className={errorsName && errorsName.length > 0 ? 'input-error' : ''}
                    />
                    {errorsName && errorsName.length > 0 ? (
                        <div>
                            {errorsName.map(item => (
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

export default CreateRoomCabinet;