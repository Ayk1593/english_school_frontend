import React, {useEffect, useState} from 'react';
import styles from './ByeWorkbook.module.scss'
import {useTranslation} from "react-i18next";
import {BtnClose, SlickNext, SlickPrev} from "../../../../components/SmallComponents/SmallComponents";
import Slider from "react-slick";
import RegistrationForm from "../../../Registration/RegistrForm/RegistrationForm";
import payment_redirect_load from '../../../../img/loading/payment-redirect_load.gif'
import {useDispatch, useSelector} from "react-redux";
import {clearRegistrAndAuthSuccess, clearRegistrStatus} from "../../../../redux/slices/registrationSlice";
import {selectIsAuth} from "../../../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {fetchGetWorkbookPaymentToken} from "../../../../redux/slices/paymentSlice";
import {workbookPaymentWidget} from "../../../../payment/createPaymentWidget";
import { v4 as uuidv4 } from 'uuid';

export const ByeWorkbook = ({btnClose, setActive, setActiveRegistr, isLk}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth);
    const clickBtnBye = async () => {
        const key = uuidv4()
        const paymentObj = {
            "idempotenceKey": key,
            "type": "workbook",
            "type_id": "644524c24fcb2dd7fff9e9f5"
        }
        if (isLk) {
            const response = await dispatch(fetchGetWorkbookPaymentToken(paymentObj))
            const confirmationToken = response.payload.confirmationToken
            workbookPaymentWidget(confirmationToken)
        } else {
            if (localStorage.token || isAuth) {
                navigate('/lk2/workbooks')
            } else {
                setActive(false)
                setActiveRegistr(true)
            }
        }
    }

    return (
        <div className={styles.bye_workbook_wrapper}>

            <div className={styles.btn_close_wrapper}>
                <BtnClose btnClose={btnClose}/>
            </div>
            <div className={styles.title}>
                <div className={styles.title1}>{t("bye_workbook.bye_workbook_title1")}</div>
                <div className={styles.times}>{t("bye_workbook.bye_workbook_title2")}</div>
            </div>
            <div className={styles.main_container}>
                <div className={styles.slider_wrapper}>
                    <WorkbookByeSlider/>
                </div>
                <div className={styles.main_text_wrapper}>
                    <ul className={styles.workbook_bye_ul}>
                        <li>{t("bye_workbook.li1")}</li>
                        <li>{t("bye_workbook.li2")}</li>
                        <li>{t("bye_workbook.li3")}</li>
                    </ul>
                    <div className={styles.about}>{t("bye_workbook.bye_workbook_about")}</div>
                </div>
            </div>

            <div className={styles.btn_wrapper}>
                <button onClick={clickBtnBye} className={styles.btn_bye}>{t("bye_workbook.btn_bye")}</button>
            </div>
        </div>
    );
};

export const RegistrAfterWorkbookBye = ({btnClose, modalClose, setModalClose}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const closeRegistr = () => {
        setModalClose(true)
        dispatch(clearRegistrStatus())
    }

    return (
        <div className={styles.registr_wrapper}>
            <div onClick={closeRegistr} className={styles.btn_close_wrapper}>
                <BtnClose btnClose={btnClose}/>
            </div>
            <div className={styles.registr__container}>
                <div className={styles.title_registr}>
                    {t("registration.registration")}
                </div>

                <RegistrationForm registrType={'withAuth'} modalClose={modalClose} setModalClose={setModalClose}/>

            </div>
            <div className={styles.info_redirect_wrapper}>
                <div className={styles.info_redirect}>
                    {t("bye_workbook.info_redirect")}
                </div>
            </div>
        </div>
    );
};

export const WorkbookByeSlider = ({}) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'-40px'} left={'54%'}/>,
        prevArrow: <SlickPrev bottom={'-40px'} left={'34%'}/>,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    nextArrow: <SlickNext bottom={'10px'} left={'54%'}/>,
                    prevArrow: <SlickPrev bottom={'10px'} left={'34%'}/>,
                }
            }
        ]
    };
    return (
        <div className={styles.slider_container}>
            <Slider {...settings}>
                <div className={styles.workbook_page_1}></div>
                <div className={styles.workbook_page_2}></div>
                <div className={styles.workbook_page_3}></div>
                <div className={styles.workbook_page_4}></div>
            </Slider>
        </div>
    )
}


export const ModalPayment = ({btnClose}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.payment_wrapper}>
            <div className={styles.btn_close_wrapper}>
                <BtnClose btnClose={btnClose}/>
            </div>
            <div id='payment-form'></div>
        </div>
    );
};


export const SuccesRegistrRedirectPayment = ({setRegistrAndAuthSuccess, setModalRegistrAfterWorkbookPay}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const redirectPayment = async () => {
        const key = uuidv4()
        const paymentObj = {
            "idempotenceKey": key,
            "type": "workbook",
            "type_id": "644524c24fcb2dd7fff9e9f5"
        }
        setRegistrAndAuthSuccess(false)
        setModalRegistrAfterWorkbookPay(false)
        dispatch(clearRegistrAndAuthSuccess())
        const response = await dispatch(fetchGetWorkbookPaymentToken(paymentObj))
        const confirmationToken = response.payload.confirmationToken
        workbookPaymentWidget(confirmationToken)
    }
    useEffect(() => {
        setTimeout(redirectPayment, 1000)
    }, [])
    return (
        <div className={styles.success_registr_redirect}>
            <div className={styles.success_registr_redirect_info1}>
                {t("bye_workbook.success_registr_redirect1")}
            </div>
            <div className={styles.success_registr_redirect_info2}>
                {t("bye_workbook.success_registr_redirect2")}
            </div>
            <div className={styles.redirect_loading}>
                <img src={payment_redirect_load}/>
            </div>
        </div>
    );
};


