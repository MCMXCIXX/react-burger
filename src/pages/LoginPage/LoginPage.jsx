import React, {useEffect, useState} from 'react';
import styles from './LoginPage.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {Button, Input, ShowIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../services/thunks/authThunks";


export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}))
        navigate('/profile')
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className="text text_type_main-medium">
                    Вход
                </p>
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
                    Войти
                </Button>

                <p className="text text_type_main-default text_color_inactive mt-20">
                    Вы — новый пользователь?{' '} <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                </p>

                <p className="text text_type_main-default text_color_inactive mt-4">
            Забыли пароль?{' '}
                    <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
          </p>
            </form>
        </div>
    );
};
