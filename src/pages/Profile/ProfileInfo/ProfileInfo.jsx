import React, {useEffect} from 'react';
import styles from './ProfileInfo.module.scss';
import {Button, EditIcon, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../../services/thunks/authThunks";


export const ProfileInfo = () => {

    const {name, email} = useSelector((state) => state.auth.user);
    const [userName, setUserName] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [PasswordIsChanged, setPasswordIsChanged] = React.useState(false);
    const nameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        if (name) {
            setUserName(name);
            setUserEmail(email);
        }
    }, [])

    const handlerSubmit = async (e) => {
        e.preventDefault();
        if (PasswordIsChanged || name !== userName || email !== userEmail) {
            const userData = {userName, userEmail};
            if (PasswordIsChanged) {
                userData.userPassword = userPassword;
            }
            try {
              const data =  await dispatch(updateUser(userData)).unwrap();

            } catch (e) {

            }
        }
    }

    const formReset = () => {
        setUserName(name);
        setUserEmail(email);
        setUserPassword("");
        setPasswordIsChanged(false);
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handlerSubmit}>
                <Input
                    ref={nameRef}
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setUserName(e.target.value)}
                    icon={'EditIcon'}
                    value={userName}
                    name={'name'}
                    error={false}
                    onIconClick={() => {
                        nameRef.current.focus()
                    }}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />

                <Input
                    ref={emailRef}
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => {

                        setUserEmail(e.target.value);
                    }}
                    icon={'EditIcon'}
                    value={userEmail}
                    name={'email'}
                    error={false}
                    onIconClick={() => {
                        emailRef.current.focus()
                    }}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />

                <Input
                    ref={passwordRef}
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => {
                        setPasswordIsChanged(true);
                        setUserPassword(e.target.value)
                    }}
                    onIconClick={() => {
                        passwordRef.current.focus()
                    }}
                    icon={'EditIcon'}
                    value={userPassword}
                    name={'password'}
                    error={false}

                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mt-6"
                />

                <Button disabled={loading} extraClass="mt-6 mr-6" htmlType="submit" type="primary" size="medium">
                     {loading ? 'Отправка...' : 'Сохранить'}
                </Button>
                <Button onClick={() => formReset()} extraClass="mt-6 mr-6" htmlType="button" type="primary"
                        size="medium">
                    Отменить
                </Button>
            </form>
        </div>
    );
};
