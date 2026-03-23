import React, {useState} from 'react';
import styles from './RegisterPage.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser} from "../../services/thunks/authThunks";
import {useDispatch} from "react-redux";


export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(registerUser({email, password, name}));
        navigate('/profile')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>

                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    error={false}
                    errorText={'Введите Ваше имя'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    error={false}
                    errorText={'Введите E-mail'}
                    size={'default'}
                    extraClass="mt-6"
                />

                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'email'}
                    error={false}
                    errorText={'Введите Пароль'}
                    size={'default'}
                    extraClass="mt-6"
                    icon="ShowIcon"
                />

                <Button extraClass="mt-6" htmlType="submit" type="primary" size="medium">
                    Регистрация
                </Button>

                <p className="text text_type_main-default text_color_inactive mt-20">
                    Уже зарегистрированы?{' '} <Link to="/login" className={styles.link}>Войти</Link>
                </p>

            </form>
        </div>
    );
};
