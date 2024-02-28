import React, {useState} from 'react';
import styles from './LkPaymentCard.module.scss'
import {useTranslation} from "react-i18next";
import payment_status_ok from '../../../../img/lk/profile/payment_status_ok.svg'
import payment_status_answer from '../../../../img/lk/profile/payment_status_answer.svg'
import PaymentItem from "./PaymentItem/PaymentItem";


const LkPaymentCard = () => {
    const {t} = useTranslation();
    const statusIcon = true ? payment_status_ok : payment_status_answer
    const [alarmIsHover, setAlarmIsHover] = useState(true)
    const paymentsArray = [1,2,3,4,5]
    return (
        <div className={styles.payment_card_wrapper}>
            <div className={styles.payment_card}>
                <div className={styles.title}>{t("lk_payment_card.payment_list")}</div>
                {paymentsArray.map(item => <PaymentItem key={item} alarmIsHover={alarmIsHover} setAlarmIsHover={setAlarmIsHover}/>)}
            </div>
        </div>
    );
};

export default LkPaymentCard;