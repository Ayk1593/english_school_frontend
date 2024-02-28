import React from 'react';
import styles from './Menu.module.scss'
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {NavLk} from "../LkComponents/LkSmallComponents/LkSmallComponents";

const Menu = ({menuActive, setMenuActive, setModalLogoutActive, exit}) => {
    const {t} = useTranslation();
    const setActive = ({isActive}) => isActive ? `${styles.active_link}` : ''
    return (
        <div onClick={e => e.stopPropagation()}
              className={menuActive ? `${styles.menu} + ' '+ ${styles.active}` : `${styles.menu}`}>
                <div className={styles.menu_content}>
                    {/*<div className={styles.nav}>*/}
                    {/*    <nav>*/}
                    {/*        <div onClick={() => setMenuActive(!menuActive)} className={styles.item}>*/}
                    {/*            <NavLink to='/lk' className={setActive}>{t("lk.personal_account")}</NavLink>*/}
                    {/*        </div>*/}
                    {/*        <div onClick={() => setMenuActive(!menuActive)} className={styles.item}>*/}
                    {/*            <NavLink to='/lk2/courses' className={setActive}>{t("lk.courses")}</NavLink>*/}
                    {/*        </div>*/}
                    {/*        <div onClick={() => setMenuActive(!menuActive)} className={styles.item}>*/}
                    {/*            <NavLink to='/lk2/exercises' className={setActive}>{t("lk.exercises")}</NavLink>*/}
                    {/*        </div>*/}
                    {/*        <div onClick={() => setMenuActive(!menuActive)} className={styles.item}>*/}
                    {/*            <NavLink to='/lk2/workbooks' className={setActive}>{t("lk.workbooks")}</NavLink>*/}
                    {/*        </div>*/}
                    {/*    </nav>*/}
                    {/*</div>*/}
                    <NavLk setModalLogoutActive={setModalLogoutActive} onClickSetActive={() => setMenuActive(!menuActive)}/>
                    <div onClick={exit} className={styles.btn_logout}>{t("lk.logout")}</div>
                </div>
        </div>
    );
};

export default Menu;