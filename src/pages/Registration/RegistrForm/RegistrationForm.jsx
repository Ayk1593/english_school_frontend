import React, {useEffect, useState} from 'react';
import styles from './RegistrationForm.module.scss'
import classNames from "classnames";
import {useForm} from "react-hook-form";
import {
    clearRegistrErrors,
    fetchRegistration,
    fetchRegistrationWithAuth,
    setPassword
} from "../../../redux/slices/registrationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const RegistrationForm = ({registrType, modalClose, setModalClose}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const registrErrors = useSelector(state => state.registration.registrErrors)
    const [registrError, setRegistrError] = useState(registrErrors)
    const registrStatus = useSelector(state => state.registration.status)

    useEffect(() => {
        setRegistrError(registrErrors)
    }, [registrErrors])

    useEffect(() => {
        if (modalClose) {
            clearErrors()
            setModalClose(false)
            reset()
            dispatch(clearRegistrErrors())
        }

    }, [modalClose])

    const {
        register,
        watch,
        formState: {
            errors, isValid
        }, handleSubmit,
        reset,
        control,
        clearErrors
    } = useForm({
        defaultValues: {
            "user_agreement_accepted": false,
            "email_subscription": true
        }
    })


    const onSubmit = (data) => {
        if (registrType === 'standard') {
            dispatch(fetchRegistration(data))
        } else if (registrType === 'withAuth') {
            // dispatch(setPassword(data.password))
            dispatch(fetchRegistrationWithAuth(data))
        }
        // reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames(styles.input__container, styles.input__name)}>
                <span>{t("registration.name")}</span>
                <div className={styles.input__with__error__container}>
                    <input {...register('name', {
                        required: "Укажите ваше имя",
                        minLength: {value: 2, message: "Введите не менее 2 символов"},
                        maxLength: {value: 30, message: "Введите не более 30 символов"}
                    })}
                           className={classNames(styles.form__input, {[styles.error_border]: errors.name?.message})}/>
                    <div className={styles.error}> {errors?.name &&
                        <div>{errors?.name?.message || "Укажите ваше имя"}</div>}</div>
                </div>
            </div>
            <div className={styles.input__container}>
                <span>{t("registration.email")}</span>
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
                        <div>{errors?.email?.message || "Введите корректный E-MAIL"}</div>}
                        {registrError}
                        {(!registrError && (registrStatus === 'error'))  && <div className={styles.registrStatus}> Сервер не отвечает. Попробуйте позже. </div>}

                    </div>
                </div>
            </div>
            <div className={styles.input__container}>
                <span>{t("registration.password")}</span>
                <div className={styles.input__with__error__container}>
                    <input type='password' {...register('password', {
                        required: "Введите пароль",
                        minLength: {
                            value: 8,
                            message: "Длина пароля должна быть не менее 8 символов"
                        }
                    })}
                           className={classNames(styles.form__input, {[styles.error_border]: errors.password?.message})}/>
                    <div className={styles.error}> {errors?.password &&
                        <div
                            className={styles.password__error}>{errors?.password?.message || "Введите пароль"}</div>}</div>

                </div>
            </div>
            <div
                className={classNames(styles.checkbox__container, styles.first__checkbox__container)}>
                <label>
                    <input type='checkbox'  {...register('user_agreement_accepted', {
                        required: {
                            value: true,
                            message: "Необходимо принять условия соглашения"
                        }
                    })}
                           className={styles.checkbox}/>

                    <span className={styles.fake__checkbox}></span>
                    <span>{t("registration.i_accept")}</span>
                </label>
                <div className={styles.error}> {errors?.user_agreement_accepted &&
                    <div>{errors?.user_agreement_accepted?.message || "Error"}</div>}</div>
            </div>
            <div className={styles.checkbox__container}>
                <label>
                    <input type='checkbox'  {...register('email_subscription')}
                        // checked={checkedNewsletter}
                        // onChange={() => setCheckedNewsletter(!checkedNewsletter)}
                           className={styles.checkbox}/>
                    <span className={styles.fake__checkbox}></span>
                    <span>{t("registration.email_newsletter")}</span>
                </label>

            </div>

            <div className={styles.btn__wrapper}>
                <button type='submit' className={styles.btn__register}>
                    {t("registration.register")}
                </button>
            </div>
        </form>
    );
};

export default RegistrationForm;