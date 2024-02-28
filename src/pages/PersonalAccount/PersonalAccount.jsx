import React, {useEffect, useState} from 'react';
import styles from './PersonalAccount.module.scss'
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/authSlice";
import {Link, Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {EnglishFlag, Envelope, Logo} from "../../components/SmallComponents/SmallComponents";
import {useTranslation} from "react-i18next";
import LkProfile from "./LkPages/LkProfile/LkProfile";
import LkCourses from "./LkPages/LkCourses/LkCousres";
import LkExercises from "./LkPages/LkExercises/LkExercises";
import LkWorkbooks from "./LkPages/LkWorkbooks/LkWorkbooks";
import Menu from "./Menu/Menu";
import Footer from "../../components/Footer/Footer";
import menu_points from "../../img/homepage/menu_points.svg";
import LkMenuMobile from "./LkComponents/LkMenuMobile/LkMenuMobile";
import Preloader from "../../components/Preloader/Preloader";
import Modal from "../../components/Modal/Modal";
import {LogoutModalContent, NavLk} from "./LkComponents/LkSmallComponents/LkSmallComponents";


const PersonalAccount = ({langTestOpen}) => {
    const [modalLogoutActive, setModalLogoutActive] = useState(false)
    const [modalLogoutClose, setModalLogoutClose] = useState(false)
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(state => state.auth.isAdmin);

    const {t} = useTranslation();
    const initialized = useSelector((state) => state.auth.initialized)
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuActive, setMenuActive] = useState(false)
    const url = useLocation()


    //
    // useEffect(() => {
    //     const changeOrientation = () => {
    //         const width = window.innerWidth
    //         if (width > 550) {
    //             setMenuOpen(false)
    //         }
    //     }
    //     window.addEventListener("resize", changeOrientation)
    //     return () => {
    //         window.removeEventListener("resize", changeOrientation)
    //     }
    //
    // }, [window.innerWidth])

    const changeMenuActive = (e) => {
        setMenuActive(!menuActive)
        e.stopPropagation()
    }

    const menuMobile = () => {
        setMenuOpen(!menuOpen)
    }
    // if (!isAuth) {
    //     return <Navigate to='/' />
    // }
    const exit = () => {
        setModalLogoutActive(true)
    }
    if (!isAuth) {
        return <Preloader/>
    }

    return (
        <div onClick={() => setMenuActive(false)} className={styles.background__wrapper}>

            <Menu exit={exit}
                  setModalLogoutActive={setModalLogoutActive} menuActive={menuActive} setMenuActive={setMenuActive}/>

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Logo hrefLogo={'/'} hrefText={'/'}/>
                        <div className={styles.flag_envelope_wrapper}>
                            <div onClick={exit} className={styles.btn_logout}>{t("lk.logout")}</div>
                            <Envelope/>
                            <Link to='/en'>
                                <EnglishFlag/>
                            </Link>
                            <div onClick={changeMenuActive}
                                 className={menuActive ? `${styles.burger_btn} + ' '+ ${styles.active}` : `${styles.burger_btn}`}>
                                <span></span>
                            </div>

                        </div>

                        <div onClick={menuMobile} className={styles.menu_points_wrapper}>
                            <img src={menu_points}/>
                        </div>
                        <LkMenuMobile setModalLogoutActive={setModalLogoutActive} menuOpen={menuOpen}
                                      menuMobile={menuMobile}/>
                    </div>

                    {isAdmin && <div className={styles.btn_admin_enter_wrapper}>
                        <Link to='/cms'>
                            <button className={styles.btn_admin_enter}>Панель администратора</button>
                        </Link>
                    </div>}

                    <div className={styles.nav_main_wrapper}>
                        <div className={styles.nav_wrapper}>
                            <div style={{marginTop: '158px'}}>
                                <NavLk/>
                            </div>
                        </div>

                        <div className={styles.main__wrapper}>
                            {url.pathname === '/lk' && <LkProfile langTestOpen={langTestOpen}/>}
                            {url.pathname === '/lk/lvl-test' && <LkProfile langTestOpen={langTestOpen}/>}
                            {url.pathname === '/lk2/courses' && <LkCourses/>}
                            {url.pathname === '/lk2/exercises' && <LkExercises/>}
                            {url.pathname === '/lk2/workbooks' && <LkWorkbooks/>}
                        </div>

                    </div>

                </div>

            </div>
            <Footer/>
            <Modal closePath={'/lk'} active={modalLogoutActive} setActive={setModalLogoutActive}
                   setModalClose={setModalLogoutClose}>
                <LogoutModalContent setModalLogoutActive={setModalLogoutActive}/>
            </Modal>
        </div>
    );
};

export default PersonalAccount;