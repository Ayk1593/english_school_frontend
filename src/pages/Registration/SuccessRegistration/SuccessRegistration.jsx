import React from 'react';
import styles from './SuccessRegistration.module.scss'
import {Link} from "react-router-dom";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {deleteRegistrSuccess} from "../../../redux/slices/registrationSlice";

const SuccessRegistration = ({langTestOpen}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper}>
            <span className={styles.text}> {t("registration.success")} </span>

            <Link to={`${!langTestOpen ? '/login' : '/login/lvl-test'}`}>
                <button onClick={() => dispatch(deleteRegistrSuccess())} className={styles.btn_login}>{t("registration.login")}</button>
            </Link>
            <Link to='/'>
                <button className={classNames(styles.btn_login, styles.btn_home)}>{t("registration.go_home")}</button>
            </Link>
        </div>
    );
};

export default SuccessRegistration;