import React, {useState} from 'react';
import styles from './LkMenuMobile.module.scss'
import classNames from "classnames";
import {EnglishFlag, Envelope, Logo} from "../../../../components/SmallComponents/SmallComponents";
import england_flag_mobile from "../../../../img/homepage/england-flag-mobile.svg";
import {useTranslation} from "react-i18next";
import {Link, NavLink} from "react-router-dom";
import envelope from "../../../../img/lk/envelope.svg";


const LkMenuMobile = ({menuOpen, menuMobile, setModalLogoutActive}) => {
    const {t} = useTranslation();
    const logout = () => {
        setModalLogoutActive(true)
        menuMobile()
    }
    return (
        <div
            className={menuOpen ? [styles.nav_menu_mobile, styles.active].join(' ') : [styles.nav_menu_mobile]}>
            <div className={classNames(styles.logo, styles.logo_mobile)}>
                <Logo hrefLogo={'/lk'} hrefText={'/lk'}/>
            </div>


            <nav className={styles.mobile_nav}>
                <div onClick={menuMobile} className={styles.nav_item}>
                    <NavLink to='/lk'>{t("lk.profile")}</NavLink>
                </div>
                <div onClick={menuMobile} className={styles.nav_item}>
                    <NavLink to='/lk2/courses'>{t("lk.courses")}</NavLink>
                </div>
                <div onClick={menuMobile} className={styles.nav_item}>
                    <NavLink to='/lk2/exercises'>{t("lk.exercises")}</NavLink>
                </div>
                <div onClick={menuMobile} className={styles.nav_item}>
                    <NavLink to='/lk2/workbooks'>{t("lk.workbooks")}</NavLink>
                </div>
                <div onClick={logout} className={styles.nav_item}>
                    <div>{t("lk.logout")}</div>
                </div>
            </nav>

            <div className={styles.language__logo__mobile___wrapper}>
                <Link to='/en'>
                    <div className={styles.language__logo__mobile}>
                        {/*<img onClick={changeLang} src={`${(language === 'ru') ? `${england_flag}` :  `${russian_flag}`}`}/>*/}
                        <img src={england_flag_mobile}/>
                    </div>
                </Link>

                <Link to='/contacts'>
                    <div className={styles.language__logo}>
                        <img src={envelope}/>
                    </div>
                </Link>
                <div onClick={menuMobile} className={styles.btn_close_wrapper}>
                </div>
            </div>
        </div>
    );
};

export default LkMenuMobile;