import React, {useEffect, useState} from 'react';
import styles from './LoginForm.module.scss'
import {Link, Navigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import {clearAuthErrors, fetchAuth, selectIsAuth} from "../../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";

const LoginForm = ({modalClose, langTestOpen, setModalClose, loginError, setLoginError}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth);
    const authError = useSelector(state => state.auth.authErrors)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        setLoginError(authError)
    }, [authError])


    useEffect(() => {
        if (modalClose) {
            clearErrors()
            setModalClose(false)
            reset()
            setLoginError(null)
        }

    }, [modalClose])
    const {
        register,
        formState: {
            errors, isValid
        }, handleSubmit,
        reset,
        clearErrors
    } = useForm()

    const onSubmit = async (data) => {
        const res = await dispatch(fetchAuth(data))
        if (res.type === 'auth/fetchAuth/rejected') {
            setLoginError(res.payload)
        }
        // reset()
    }
    if (isAuth && !langTestOpen) {
        return <Navigate to='/lk'/>
    } if (isAuth && langTestOpen) {
        return <Navigate to='/lk/lvl-test'/>
    }

    return (
        <div className={styles.login__form__wrapper}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.login__form}>
                    <div className={styles.login__input}>
                        <span>{t("login.email")}</span>
                        <div className={styles.input__with__error__container}>
                            <input type='email' {...register('email', {
                                required: "Поле E-MAIL не заполнено",
                                pattern: {
                                    value: /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/,
                                    message: "Введите корректный E-mail"
                                }
                            })}
                                   className={classNames(styles.form__input, {[styles.error_border]: errors.email?.message})}/>
                            <div className={styles.error}> {errors?.email &&
                                <div>{errors?.email?.message || "Введите корректный E-mail"}</div>}</div>
                        </div>
                    </div>

                    <div className={styles.password__input}>
                        <span>{t("login.password")}</span>
                        <div className={styles.input__with__error__container}>
                            <input type='password' {...register('password', {
                                required: "Введите пароль",
                                minLength: {value: 8, message: "Длина пароля должна быть не менее 8 символов"}
                            })}
                                   className={classNames(styles.form__input, {[styles.error_border]: errors.password?.message})}/>
                            <div className={styles.error}>
                                {errors?.password && <div>{errors?.password?.message || "Введите пароль"}</div>}
                                {loginError}
                                {(!loginError && (authStatus === 'error'))  && <div className={styles.authStatus}> Сервер не отвечает. Попробуйте позже. </div>}
                            </div>

                        </div>
                    </div>
                    <button type='submit' className={styles.btn__enter}>{t("login.enter")}</button>

                    <div className={styles.forgot__password__registration}>
                        <div className={styles.forgot__password}>{t("login.forgot_password")}</div>
                        <div className={styles.point}></div>
                        <Link to='/registration'>
                            <div onClick={() => dispatch(clearAuthErrors())}
                                 className={styles.registration}>{t("login.registration")}</div>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;