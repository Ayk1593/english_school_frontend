import React, {useState} from 'react';
import styles from "./CoursesCards.module.scss"
import present from "../../../img/courses/present.png";
import present_text from "../../../img/courses/present_text.png";
import yulia_icon from "../../../img/courses/yulia_icon.png";
import books_icon from "../../../img/courses/books_icon.png";
import clock_icon from "../../../img/courses/clock_icon.png";
import hands_icon from "../../../img/courses/hands_icon.png";
import {useTranslation} from "react-i18next";
import classNames from "classnames";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../../components/Modal/Modal";
import {fetchEmailSubscribe} from "../../../redux/slices/differentSlice";


export const BeginnerCard = ({clickPresentMobile, setPopupOpacity}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.courses__card__wrapper}>
            <div className={styles.beginner__card}>

                <div className={styles.present__icon__mobile}>
                    <img onClick={clickPresentMobile} src={present}/>
                </div>
                <img className={styles.present__text__icon__mobile} src={present_text}/>

                <div className={styles.yulia__icon}>
                    <img src={yulia_icon}/>
                    <div className={styles.title__card__mobile}>{t("courses.touristos_title_card")}</div>
                </div>

                <div className={styles.info__card}>
                    <div className={styles.title__card}>{t("courses.touristos_title_card")}</div>
                    <p className={styles.card__about}>{t("courses.card_about")}</p>
                    <div className={styles.about__icons}>
                        <div className={styles.about__icon}>
                            <img src={books_icon}/>
                            <div>{t("courses.level")}</div>
                        </div>
                        <div className={styles.about__icon}>
                            <img src={clock_icon}/>
                            <div>{t("courses.5themes")}</div>
                        </div>
                        <div className={styles.about__icon}>
                            <img src={hands_icon}/>
                            <div>{t("courses.communicative_method")}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.present__button}>
                    <div onMouseOver={() => setPopupOpacity(1)} onMouseLeave={() => setPopupOpacity(0)}
                         className={styles.present__icon}>
                        <img src={present}/>

                    </div>
                    <img className={styles.present__text__icon} src={present_text}/>
                    <div className={styles.price}>5 499₽</div>
                    <button className={styles.btn}>{t("courses.btn_start")}</button>
                </div>

            </div>

        </div>
    );
};


export const EmailSubscribeCard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const emailSubscribeError = useSelector(state => state.different.emailSubscribeError)
    const {
        register,
        formState: {
            errors, isValid
        }, handleSubmit,
        reset,
        clearErrors
    } = useForm()
    const onSubmit = (data) => {
        dispatch(fetchEmailSubscribe(data))
        reset()
    }

    return (
        <div className={styles.courses__second__card__wrapper}>
        <div className={styles.courses__second__card}>
            <p>{t("courses.second_card_about")}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.subscribe}>
                    <div className={styles.form__input}>
                    <input onBlurCapture={() => clearErrors()} {...register('email', {
                        required: "Поле E-MAIL не заполнено",
                        pattern: {value: /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/, message: "Введите корректный E-mail"}
                    })}
                           placeholder={t("courses.your_email")}
                           className={classNames(styles.input_email, {[styles.error_border]: errors.email?.message})}/>
                    <div className={styles.error}> {errors?.email &&
                        <div>{errors?.email?.message || "Введите корректный E-MAIL"}</div>}</div>

                    </div>
                    <button type='submit' className={styles.btn}>{t("courses.subscribe")}</button>
                </div>
            </form>

        </div>
        </div>
    );
};
