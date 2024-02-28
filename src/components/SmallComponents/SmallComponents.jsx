import React, {useEffect, useState} from 'react';
import styles from './SmallComponents.module.scss'
import {Navigate, Redirect, useLocation, useNavigate} from "react-router-dom";
import logo from "../../img/homepage/logo.svg";
import england_flag from "../../img/homepage/england-flag.svg";
import russian_flag from "../../img/homepage/russian-flag.svg"
import envelope from '../../img/lk/envelope.svg'
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";
import classNames from "classnames";
import mobile_back_photo from "../../img/homepage/mobile-back-photo.svg";
import send_answer_success_close from '../../img/contacts/X.svg'
import {useDispatch, useSelector} from "react-redux";
import {closeSubscribeModalOpen} from "../../redux/slices/differentSlice";

export const Logo = ({hrefLogo, hrefText}) => {
    return (
        <div className={styles.logo}>
            <a href={hrefLogo}>
                <div className={styles.logo__circle}>
                    <img src={logo}/>
                </div>
            </a>
            <a href={hrefText}>
                <div className={styles.logo__name}>English School by Julia</div>
            </a>
        </div>
    );
};

export const EnglishFlag = () => {
    const [language, setLanguage] = useState('ru')
    const {t, i18n} = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const changeLang = () => {
        if (language === 'ru') {
            setLanguage('en')
            changeLanguage("en")
        } else if (language === 'en') {
            setLanguage('ru')
            changeLanguage("ru")
        }
    }

    return (
        <div className={styles.language__logo}>
            {/*<img onClick={changeLang} src={`${(language === 'ru') ? `${england_flag}` :  `${russian_flag}`}`}/>*/}
            <img src={england_flag}/>
        </div>
    )
}

export const Flag = ({lang}) => {
    const [language, setLanguage] = useState('ru')
    const [selectLang, setSelectLang] = useState('')
    useEffect(() => {
            if (lang === 'en') {
                setSelectLang(england_flag)
            } else if (lang === 'ru') {
                setSelectLang(russian_flag)
            }
        },
        [])
    const {t, i18n} = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const changeLang = () => {
        if (lang === 'en') {
            changeLanguage("en")
        } else if (lang === 'ru') {
            changeLanguage("ru")
        }
    }


    return (
        <div onClick={changeLang} className={styles.flag_wrapper}>
            <img src={selectLang}/>
        </div>
    )
}


export const Envelope = () => {
    return (
        // <a href='/contacts/#answers'>
        <Link to='/contacts/answer'>
            <div className={styles.language__logo}>
                <img src={envelope}/>
            </div>
        </Link>
        // </a>
    )
}


export const BtnClose = ({btnClose}) => {
    return (
        <div onClick={btnClose} className={styles.btn_close_wrapper}>
        </div>
    )
}

export const LanguageTestInfo = ({btnClose}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.lang_test_info_wrapper}>
            <div className={styles.btn_close_modal_test}><BtnClose btnClose={btnClose}/></div>
            <div className={styles.lang_test_info}>
                <div className={styles.test_title}>
                    {t("language_test_info.title")}
                </div>
                <ul className={styles.test_li_wrapper}>
                    <li className={styles.test_li}> {t("language_test_info.first_li")}</li>
                    <li className={styles.test_li}>{t("language_test_info.second_li")}</li>
                </ul>
                <div className={styles.last_li}>{t("language_test_info.last_li")}</div>
                <Link to='/registration/lvl-test'>
                    <button className={styles.btn_test_info_registr}>{t("language_test_info.registration")}</button>
                </Link>
            </div>
        </div>
    )
}

export const Snack = ({snackIsOpen, handleClose}) => {
    return (
        <Snackbar
            open={snackIsOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert severity="success">Курс успешно добавлен!</Alert>
        </Snackbar>
    )
}


export const EmailSubscribeSuccess = ({modalClose, setModalClose, setActive, emailSubs}) => {
    const {t} = useTranslation();
    const location = useLocation()
    const dispatch = useDispatch()
    const emailSubscribeError = useSelector(state => state.different.emailSubscribeError)
    const emailSubsStatus = useSelector(state => state.different.emailSubsStatus)
    const [emailSubsError, setEmailSubsError] = useState(emailSubscribeError)

    const closeModal = () => {
        setActive(false)
        if (emailSubs) {
            dispatch(closeSubscribeModalOpen())
        }

    }

    useEffect(() => {
            setEmailSubsError(emailSubscribeError)
        },
        [emailSubscribeError])

    useEffect(() => {
        if (modalClose) {
            setModalClose(false)
        }

    }, [modalClose])

    return (
        <div className={classNames(styles.email_subs__modal_wrapper, styles.success)}>
            <div className={styles.btn_close}>
                <BtnClose btnClose={closeModal}/>
            </div>
            <div className={classNames(styles.success_content)}>

                <div className={styles.spans}>
                    {emailSubsError && <div className={styles.emailSubsError}>{ (location.pathname !== '/en')
                        ? emailSubsError : "Done! You're already in our base, we'll send you new mails soon" }</div>}
                    {(!emailSubsError && (emailSubsStatus === 'error')) && <div className={styles.emailSubsError}>
                        Сервер не отвечает. Попробуйте позже.
                    </div>}
                    {(!emailSubsError && (emailSubsStatus !== 'error')) && <div>
                        <div className={styles.span1}> {(location.pathname !== '/en') ? `${t("courses.subscribe_success1")}` : 'Thanks you for subscribing!' }</div>
                        <div className={styles.span2}> {(location.pathname !== '/en') ? `${t("courses.subscribe_success2")}` : 'You will get many useful materials on language learning!' } </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};


export const MobileBackPhoto = () => {

    return (
        <div className={styles.mobile__background__wrapper}><img src={mobile_back_photo}/></div>
    );
};

export const SlickNext = ({onClick, bottom, left}) => {
    return (
        <div onClick={onClick}
             style={{bottom: `${bottom}`, left: `${left}`}}
             className={styles.slick_next_wrapper}></div>
    );
};

export const SlickPrev = ({onClick, bottom, left}) => {
    return (
        <div onClick={onClick}
             style={{bottom: `${bottom}`, left: `${left}`}}
             className={styles.slick_prev_wrapper}></div>
    );
};


export const PrivacyPolitic = () => {
    useEffect(() => {
        window.location.replace('https://docs.google.com/document/d/13dWX3pJdWP8_sQi55kyUWwcixuaYv19_bSYpwuSVvGY/edit?usp=sharing');
    }, [])
    return (
        <>
        </>
    )
}

export const PublicOffer = () => {
    useEffect(() => {
        window.location.replace('https://docs.google.com/document/d/1AURvIIfOWYZdcsAiakdwcpS-RZfuQdIX7UUCL-arRs8/edit?usp=sharing');
    }, [])
    return (
        <>
        </>
    )
}

export const SendAnswerSuccess = ({modalClose, setModalClose, setActive}) => {
    const {t} = useTranslation();

    useEffect(() => {
        if (modalClose) {
            setModalClose(false)
        }

    }, [modalClose])

    return (
        <div className={classNames(styles.send_answer__modal_wrapper, styles.send_answer_success)}>
            <div className={styles.btn_close_send_answer_success}>
                <img src={send_answer_success_close} onClick={() => setActive(false)}/>
            </div>
            <div className={classNames(styles.success_content, styles.send_answer_content)}>

                <div className={classNames(styles.spans, styles.send_answer_spans)}>
                    <div className={styles.send_answer_success1}> {t("contacts.send_answer_success1")} </div>
                    <div className={styles.send_answer_success2}> {t("contacts.send_answer_success2")} </div>
                </div>
            </div>
        </div>
    );
};





