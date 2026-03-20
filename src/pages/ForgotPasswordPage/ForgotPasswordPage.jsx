import React, {useEffect, useState} from 'react';
import styles from './ForgotPasswordPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {resetPassword} from "../../services/thunks/authThunks";
import {setPasswordResetRequested} from "../../services/reducers/authSlice";


export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [resetStatusInfo, setResetStatusInfo] = useState('');
    const {loading} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResetStatusInfo('')

        try {
            await dispatch(resetPassword(email)).unwrap();
            setEmail('');
            setResetStatusInfo('Письмо отправлено Вам на почту');

            navigate('/reset-password');
        } catch (error) {
            setResetStatusInfo(error)
        }
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
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

                <Button extraClass="mt-6" htmlType="submit" type="primary" size="medium">
                    {loading ? 'Отправка...' : 'Восстановить'}
                </Button>

                {resetStatusInfo && (<p className="text text_type_main-medium mt-4">{resetStatusInfo}</p>)}


                <p className="text text_type_main-default text_color_inactive mt-4">
                    Вспомнили пароль?{' '}
                    <Link to="/login" className={styles.link}>Войти</Link>
                </p>
            </form>
        </div>
    );
};
