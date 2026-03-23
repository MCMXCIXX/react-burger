import React from 'react';
import styles from './ResetPasswordPage.module.scss';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassword} from "../../services/thunks/authThunks";


export const ResetPasswordPage = () => {
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    const [resetStatusInfo, setResetStatusInfo] = React.useState('');
    const {loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(setNewPassword({password, code})).unwrap();
        } catch (error) {
            setResetStatusInfo(error.message);
        }
    }


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className="text text_type_main-medium">
                    Восстановление пароля
                </p>
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

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    name={'code'}
                    error={false}
                    errorText={'Введите код из письма'}
                    size={'default'}
                    extraClass="mt-6"
                />

                <Button extraClass="mt-6" htmlType="submit" type="primary" size="medium">
                    {loading ? 'Отправка...' : 'Сохранить'}
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
