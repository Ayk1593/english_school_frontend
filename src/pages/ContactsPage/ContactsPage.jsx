import React, {useEffect, useRef, useState} from 'react';
import styles from './ContactsPage.module.scss'
import {
    BtnClose,
    Logo,
    SendAnswerSuccess
} from "../../components/SmallComponents/SmallComponents";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import Modal from "../../components/Modal/Modal";
import {useSelector} from "react-redux";


const ContactsPage = ({defaultTopic}) => {
    const {t} = useTranslation();
    const sendAnswerIsSuccess = useSelector(state => state.different.sendAnswerIsSuccess)
    const [sendAnswerSuccess, setSendAnswerSuccess] = useState(false)
    const [modalClose, setModalClose] = useState(false)
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'
    const formRef = useRef(null)

    const [selectTopic, setSelectTopic] = useState(defaultTopic || 'default')


    useEffect(() => {
        window.scrollTo(0, 0);
        if ((selectTopic === 'payment_problem') || (selectTopic === 'answer')) {
            formRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, []);

    useEffect(() => {
            setSendAnswerSuccess(sendAnswerIsSuccess)
        },
        [sendAnswerIsSuccess])

    // useEffect(() => {
    //     if (modalClose) {
    //         clearErrors()
    //         setModalClose(false)
    //         reset()
    //         dispatch(clearRegistrErrors())
    //     }
    //
    // }, [modalClose])
    const {
        register,
        formState: {
            errors, isValid
        }, handleSubmit,
        reset,
        clearErrors
    } = useForm({
        defaultValues: {
            "user_agreement_accepted": false
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.window}>
                    <div className={styles.title}>
                        {t("contacts.title")}
                    </div>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>


                    <div className={styles.fio}>
                    <span className={styles.self_employed}>
                        {t("contacts.self-employed")}
                    </span>
                        <span className={styles.surname_and_name}>
                        {t("contacts.surname_and_name")}
                    </span>
                        <span className={styles.patronymic}>
                        {t("contacts.patronymic")}
                    </span>
                    </div>
                    <div className={styles.inn}>
                        {t("contacts.inn")} 773432867223
                    </div>

                    <div className={styles.phone_wrapper}>
                         <span className={styles.self_employed}>
                        {t("contacts.phone_russia")} <span className={styles.phone}> +7 999 9863039 </span>
                    </span>
                    </div>

                    <div className={styles.click_here}>
                        <a href='https://api.whatsapp.com/send/?phone=79999863039&text&type=phone_number&app_absent=0'
                           target="_blank" rel="noopener noreferrer">
                            {t("contacts.click_here")} </a>
                    </div>

                    <div className={styles.email}>
                        Email: info@feodesign.xyz
                    </div>


                    <div className={styles.links_wrapper}>
                        <div className={styles.here}>
                            {t("contacts.here")}
                        </div>
                        <div className={styles.privacy_policy}>
                            <Link to='/privet'>    {t("contacts.privacy_policy")}</Link>
                        </div>
                        <div className={styles.public_offer}>
                            <Link to='/oferta'> {t("contacts.public_offer")}</Link>
                        </div>
                    </div>

                    <div id='answers' className={styles.answers}>
                        {t("contacts.answers")}
                    </div>
                    <div className={styles.fill_the_form}>
                        {t("contacts.fill_the_form")}
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className={styles.contacts_form}>
                        <div ref={formRef} className={styles.form_wrapper}>

                            <div className={styles.topic_wrapper}>
                                <div> {t("contacts.topic")} </div>
                                <div className={styles.input__with__error__container}>
                                    <select name='topic'
                                            {...register('topic', {
                                                required: "Выберите тему"
                                            })}
                                            className={classNames(styles.form__input, styles.topic_select, {[styles.error_border]: errors.topic?.message})}>
                                        <option value='' selected={(selectTopic === 'default') || (selectTopic === 'answer')}
                                                disabled>Выберите тему
                                        </option>
                                        <option selected={selectTopic === 'payment_problem'}
                                                value={`${t("contacts.payment_problem")}`}>{t("contacts.payment_problem")}</option>
                                        <option
                                            value={`${t("contacts.forgot_password")}`}>{t("contacts.forgot_password")}</option>
                                        <option value={`${t("contacts.other")}`}>{t("contacts.other")}</option>
                                    </select>
                                    <div className={styles.error}> {errors?.topic &&
                                        <div>{errors?.topic?.message || "Выберите тему"}</div>}</div>
                                </div>
                            </div>

                            <div className={styles.name_wrapper}>
                                <div> {t("contacts.name")} </div>
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
                            <div className={styles.email_wrapper}>
                                Email: <div className={styles.input__with__error__container}>
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
                            <div className={styles.answer_wrapper}>
                                {t("contacts.answer")}
                                <div className={styles.input__with__error__container}>
                                <textarea rows='4' {...register('answer', {
                                    required: "Введите текст вопроса",
                                    minLength: {value: 10, message: "Введите не менее 10 символов"},
                                    maxLength: {value: 100, message: "Введите не более 100 символов"}
                                })}
                                          className={classNames(styles.form__input, {[styles.error_border]: errors.answer?.message})}/>
                                    <div className={styles.error}> {errors?.answer &&
                                        <div>{errors?.answer?.message || "Введите текст вопроса"}</div>}</div>
                                </div>
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
                                <span className={styles.i_accept}>{t("contacts.i_accept")}</span>
                            </label>
                            <div className={styles.error}> {errors?.user_agreement_accepted &&
                                <div>{errors?.user_agreement_accepted?.message || "Error"}</div>}</div>
                        </div>

                        <div className={styles.btn_send_answer_wrapper}>
                            <button type='submit' className={styles.btn_send_answer}>
                                {t("contacts.send_answer")}
                            </button>
                        </div>
                    </form>


                    <div className={styles.btn_close_wrapper}>
                        <Link to={fromPage}> <BtnClose/> </Link>
                    </div>
                </div>
            </div>
            <Modal closePath={'/contacts'} setModalClose={setModalClose}
                   active={sendAnswerSuccess} setActive={setSendAnswerSuccess}>
                <SendAnswerSuccess setActive={sendAnswerSuccess}/>
            </Modal>
        </div>
    );
};

export default ContactsPage;