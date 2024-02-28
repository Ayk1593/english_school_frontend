import React, {useState} from 'react';
import styles from './PaymentItem.module.scss'
import payment_status_ok from "../../../../../img/lk/profile/payment_status_ok.svg";
import payment_status_answer from '../../../../../img/lk/profile/payment_status_answer.svg';
import payment_status_pending from '../../../../../img/lk/profile/payment_status_pending.svg';
import X from "../../../../../img/contacts/X.svg";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import classNames from "classnames";


const PaymentItem = ({alarmIsHover, setAlarmIsHover}) => {
    const {t} = useTranslation();
    const [popupOpacity, setPopupOpacity] = useState('none')

    const statusIcon = true ? payment_status_ok : payment_status_answer

    const handlePopupOver = () => {
        if (alarmIsHover) {
            setPopupOpacity('block')
            setAlarmIsHover(false)
        }
    }
    const handlePopupLeave = () => {
        setPopupOpacity('none')
        setAlarmIsHover(true)
    }

    return (
        <div className={styles.payment_item_wrapper}>
            <div className={styles.payment_item}>
                <div className={styles.course_title}>Курс: Туристос</div>
                <div className={classNames(styles.price, {[styles.crossed_out_price]: true})}>5499 ₽</div>
                <div className={styles.status_icon_wrapper}>
                    <div className={styles.answer_status_icon}
                         onClick={handlePopupOver}
                         onMouseOver={handlePopupOver}>
                        <img src={payment_status_answer}/>
                    </div>

                    {/*<div className={styles.success_status_icon}>*/}
                    {/*    <img src={payment_status_ok}/>*/}
                    {/*</div>*/}

                    {/*<div className={classNames(styles.status_icon_pending, {[styles.spin]: pending})}*/}
                    {/*     onMouseOver={handlePopupOver}>*/}
                    {/*    <img src={payment_status_pending}/>*/}
                    {/*</div>*/}
                    <div className={styles.payment_popup}
                         style={{display: `${popupOpacity}`}}
                         onMouseLeave={handlePopupLeave}>
                        <div onClick={handlePopupLeave}>
                            <img className={styles.close_popup} src={X}/></div>
                        <div>{t("lk_payment_card.payment_failed")}</div>
                        <ul>
                            <li>{t("lk_payment_card.li_reason1")}</li>
                            <li>{t("lk_payment_card.li_reason2")}</li>
                        </ul>
                        <Link to='/contacts/payment_problem'>
                            <div className={styles.popup_help}>{t("lk_payment_card.popup_help")}</div>
                        </Link>
                    </div>
                </div>
            </div>


            <div className={styles.date_and_status}>
                <div className={styles.date}>
                    24.04.2023
                </div>
                <div className={styles.update_status}>
                    {t("lk_payment_card.update_status")}
                </div>
            </div>

        </div>
    );
};

export default PaymentItem;