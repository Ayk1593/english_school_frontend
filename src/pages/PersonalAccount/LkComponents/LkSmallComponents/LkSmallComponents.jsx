import React from 'react';
import styles from './LkSmallComponents.module.scss'
import button_plus from "../../../../img/lk/courses/button_plus.png";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {logout} from "../../../../redux/slices/authSlice";
import classNames from "classnames";
import {BtnClose} from "../../../../components/SmallComponents/SmallComponents";


export const ButtonPlus = () => {
    return (
        <div className={styles.button_plus_wrapper}>
            <img src={button_plus}/>
        </div>
    );
};

export const NavLk = ({onClickSetActive}) => {
    const {t} = useTranslation();
    const setActive = ({isActive}) => isActive ? `${styles.active_link}` : ''

    return (
        <div className={styles.nav}>
            <nav>
                <div onClick={onClickSetActive} className={styles.item}>
                    <NavLink to='/lk' className={setActive}>{t("lk.profile")}</NavLink>
                </div>
                <div onClick={onClickSetActive} className={styles.item}>
                    <NavLink to='/lk2/courses' className={setActive}>{t("lk.courses")}</NavLink>
                </div>
                <div onClick={onClickSetActive} className={styles.item}>
                    <NavLink to='/lk2/exercises' className={setActive}>{t("lk.exercises")}</NavLink>
                </div>
                <div onClick={onClickSetActive} className={styles.item}>
                    <NavLink to='/lk2/workbooks' className={setActive}>{t("lk.workbooks")}</NavLink>
                </div>
            </nav>
        </div>
    )
}


export const LogoutModalContent = ({setModalLogoutActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const exit = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div className={styles.modal_logout_wrapper}>
            <div className={styles.modal_logout_text}>{t("lk.sure_logout")}</div>
            <div className={styles.btn_choice_wrapper}>
                <button onClick={exit} className={styles.btn_choice}>{t("lk.yes")}</button>
                <button onClick={() => setModalLogoutActive(false)} className={styles.btn_choice}>{t("lk.no")}</button>
            </div>
        </div>
    );
};



export const YouAreSubscribed = ({}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.you_are_subscribed_wrapper}>
            <div className={styles.you_are_subscribed_container}>
                <div className={styles.you_are_subscribed}>
                    <div className={styles.you_are_subscribed_li1}> {t("lk_subscribe.new_courses")} </div>
                    <div className={styles.you_are_subscribed_li2}> {t("lk_subscribe.you_are_subscribed")} </div>
            </div>
            </div>
        </div>
    );
};



// export const ProgressList = () => ({ number }) {
//     const listItems = Array.from({ length: number }, (_, index) => index + 1).map((item) => (
//         <li key={item}>{item}</li>
//     ));
//     return (
//         <ul>{listItems}</ul>
//     )
// }
