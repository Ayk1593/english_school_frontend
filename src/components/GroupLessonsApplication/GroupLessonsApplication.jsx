import React, {useEffect} from 'react';
import styles from './GroupLessonsApplication.module.scss'
import {useTranslation} from "react-i18next";
import classNames from "classnames";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {BtnClose} from "../SmallComponents/SmallComponents";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/authSlice";
import {clearGroupLessApp} from "../../redux/slices/differentSlice";

export const GroupLessonsApplication = ({modalClose, setModalClose, setModalActiveTestInfo}) => {
    const {t} = useTranslation();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate()
    useEffect(() => {
        if (modalClose) {
            clearErrors()
            setModalClose(false)
            reset()
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


    const takeTest = () => {
        if (localStorage.token || isAuth)  {
            navigate('/lk/lvl-test')
        } else {
            setModalActiveTestInfo(true)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
    }
    return (
        <div className={styles.application_modal_wrapper}>
            <div className={styles.application_modal_content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.item}>
                        <span>{t("group_lessons_application.name")}</span>
                        <div className={styles.input__with__error__container}>
                            <input  {...register('name', {
                                required: "Укажите ваше имя",
                            })}
                                    className={classNames(styles.input_apllication, styles.input_name,
                                        {[styles.error_border]: errors.name?.message})}/>
                            <div className={styles.error}> {errors?.name &&
                                <div>{errors?.name?.message || "Укажите ваше имя"}</div>}</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span>{t("group_lessons_application.phone_number")}</span>
                        <div className={styles.input__with__error__container}>
                            <input  {...register('phone', {
                                required: "Укажите ваш номер телефона",
                            })}
                                    className={classNames(styles.input_apllication, styles.input_phone,
                                        {[styles.error_border]: errors.phone?.message})}/>
                            <div className={styles.error}> {errors?.phone &&
                                <div>{errors?.phone?.message || "Укажите ваш номер телефона"}</div>}</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span>{t("group_lessons_application.city")}</span>
                        <div className={styles.input__with__error__container}>
                            <input  {...register('city', {
                                required: "Укажите город вашего проживания",
                            })}
                                    className={classNames(styles.input_apllication, styles.input_city,
                                        {[styles.error_border]: errors.city?.message})}/>
                            <div className={styles.error}> {errors?.city &&
                                <div>{errors?.city?.message || "Укажите город вашего проживания"}</div>}</div>
                        </div>
                    </div>
                    <div className={styles.btn_wrapper}>
                        <button className={styles.btn_send}>{t("group_lessons_application.btn_send")}</button>
                    </div>
                </form>
                <div className={styles.footer_wrapper}>

                        <span onClick={takeTest}>{t("group_lessons_application.language_test")}</span>

                    <span className={styles.point}></span>
                    <Link to='/registration'>
                        <span>{t("group_lessons_application.registration_in_school")}</span></Link>
                </div>
            </div>
        </div>
    );
};


export const GroupLessonsApplicationSuccess = ({modalClose, setModalClose, setActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const closeModal = () => {
        setActive(false)
        dispatch(clearGroupLessApp())
    }

    useEffect(() => {
        if (modalClose) {
            setModalClose(false)
        }

    }, [modalClose])

    return (
        <div className={classNames(styles.application_modal_wrapper, styles.success)}>
            <div className={classNames(styles.success_content)}>
                <div className={styles.btn_close}>
                    <BtnClose btnClose={closeModal}/>
                </div>
                <span> {t("group_lessons_application.success")} </span>
            </div>
        </div>
    );
};

