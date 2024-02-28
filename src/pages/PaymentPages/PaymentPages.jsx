import React, {useEffect, useState} from 'react';
import styles from './PaymentPages.module.scss'
import {Link} from "react-router-dom";
import {BtnClose} from "../../components/SmallComponents/SmallComponents";
import Modal from "../../components/Modal/Modal";
import loadingGif from '../../img/loading/payment-redirect_load.gif'
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {fetchGetWorkbookPaymentStatus} from "../../redux/slices/paymentSlice";

export const WorkbookAfterPaymentPage = () => {
    const [modalClose, setModalClose] = useState(false)
    const [active, setActive] = useState(true)
    return (
        <div className={styles.workbook_after_payment_wrapper}>
            <div className={styles.workbook_after_payment_container}>
                <div className={styles.workbook_after_payment}>

                </div>
            </div>


            <Modal closePath={'/lk2/workbooks'} setModalClose={setModalClose}
                   active={active} setActive={setActive}>
                <SuccessWorkbookPaymentModal/>
            </Modal>
        </div>
    );
};


export const SuccessWorkbookPaymentModal = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [paymentStatus, setPaymentStatus] = useState('')
    useEffect(() => {
        const getWorkbookPaymentStatus = setInterval(() => {
            // dispatch(fetchGetWorkbookPaymentStatus())
        }, 2000);

        return () => clearInterval(getWorkbookPaymentStatus);
    }, [])
    return (
        <div className={styles.success_payment_wrapper}>
            <div className={styles.success_payment}>
                <div className={styles.btn_close}><Link to='/lk2/workbooks'><BtnClose/> </Link></div>
                {(paymentStatus === 'success') && <div className={styles.workbook_payment_success}>{t("payment_workbook.success")}</div>}
                {(paymentStatus === 'error') && <div className={styles.workbook_payment_success}>{t("payment_workbook.unsuccess")}</div>}
                {(paymentStatus === '') && <div className={styles.loader_wrapper}>
                    <img src={loadingGif}/>
                </div>}
            </div>
        </div>
    );
};
