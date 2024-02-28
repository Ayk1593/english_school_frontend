import React, {useEffect, useState} from 'react';
import styles from './Header.module.scss'
import {Link, Navigate, useNavigate} from "react-router-dom";
import england_flag_mobile from '../../../img/homepage/england-flag-mobile.svg'
import menu_points from '../../../img/homepage/menu_points.svg'
import '../../../App.css'
import {useTranslation} from 'react-i18next';
import classNames from "classnames";
import {BtnClose, EnglishFlag, Logo} from "../../../components/SmallComponents/SmallComponents";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "../../../redux/slices/authSlice";
import {deleteRegistrSuccess} from "../../../redux/slices/registrationSlice";
import LanguageSelect from "../../../components/LanguageSelect/LanguageSelect";


const Header = ({setLoginModalActive}) => {
    const [language, setLanguage] = useState('ru')
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const profileName = useSelector((state) => state.auth.userName)

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };


    const menuMobile = () => {
        setMenuOpen(!menuOpen)
    }

    const clickLoginMobile = () => {
        menuMobile();
        dispatch(fetchAuthMe())
        if (isAuth) {
            return <Navigate to='/lk'/>
        } else {
            setLoginModalActive(true)
            dispatch(deleteRegistrSuccess())
            navigate('/login')
        }
    }
    const login = () => {
        dispatch(fetchAuthMe())
        if (isAuth) {
            return <Navigate to='/lk'/>
        } else {
            setLoginModalActive(true)
            dispatch(deleteRegistrSuccess())
            navigate('/login')
        }
    }
    // const changeLang = () => {
    //     if (language === 'ru') {
    //         setLanguage('en')
    //         changeLanguage("en")
    //     } else if (language === 'en') {
    //         setLanguage('ru')
    //         changeLanguage("ru")
    //     }
    // }

    return (
        <div>
            <header className={styles.header}>
                <Logo hrefLogo={'/'} hrefText={'#about-school'}/>
                <div
                    className={menuOpen ? [styles.nav_menu_mobile, styles.active].join(' ') : [styles.nav_menu_mobile]}>
                    <div className={classNames(styles.logo, styles.logo_mobile)}>
                        <Logo href={'#about-school'}/>
                    </div>
                    <ul className={styles.nav_mobile}>
                        <li onClick={menuMobile}><a href='#courses'>{t("headers.courses")}</a></li>
                        <li onClick={menuMobile}><a href='#workbooks'>{t("headers.workbooks")}</a></li>
                        <li onClick={menuMobile}><a href='#lessons'>{t("headers.lessons")}</a></li>
                        <li onClick={clickLoginMobile} className={styles.login_mobile}>{t("headers.login")}</li>
                    </ul>

                    <div className={styles.language__logo__mobile___wrapper}>
                        <div onClick={() => navigate('/en')} className={styles.language__logo__mobile}>
                            {/*<img onClick={changeLang} src={`${(language === 'ru') ? `${england_flag}` :  `${russian_flag}`}`}/>*/}
                            <img src={england_flag_mobile}/>
                        </div>
                        <BtnClose btnClose={menuMobile}/>
                    </div>
                </div>

                <div className={styles.nav__lang__wrapper}>
                    <nav>
                        <ul className={styles.nav}>
                            <li><a href='#courses'>{t("headers.courses")}</a ></li>
                            <li><a href='#lessons'>{t("headers.lessons")}</a></li>
                            <li><a href='#workbooks'>{t("headers.workbooks")}</a></li>
                        </ul>
                    </nav>

                    <div className={styles.login__language__wrapper}>
                        <div className={styles.login}
                             onClick={login}
                        >{t("headers.login")}</div>

                        {/*<LanguageSelect />*/}

                        <Link to='/en'>
                            <EnglishFlag />
                        </Link>


                    </div>
                </div>
                <div onClick={menuMobile} className={styles.menu_points_wrapper}>
                    <img src={menu_points}/>
                </div>
            </header>
        </div>
    );
};

export default Header;