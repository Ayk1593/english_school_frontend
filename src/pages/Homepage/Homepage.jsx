import React, {useEffect, useState} from 'react';
import Header from "./Header/Header";
import Main from "./Main/Main";
import styles from './Homepage.module.scss'
import Courses from "./Courses/Courses";
import Lessons from "./Lessons/Lessons";
import Workbooks from "./Workbooks/Workbooks";
import AboutYulia from "./AboutYulia/AboutYulia";
import Modal from "../../components/Modal/Modal";
import LoginForm from "../../components/LoginForm/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, pendingStatus, selectIsAuth, token} from "../../redux/slices/authSlice";
import Footer from "../../components/Footer/Footer";
import Preloader from "../../components/Preloader/Preloader";
import mobile_back_photo from '../../img/homepage/mobile-back-photo.svg'
import {MobileBackPhoto as MobileBackPhotoSVG} from "../../components/SmallComponents/SmallComponents";


const Homepage = ({booleanModal, langTestOpen, registrSuccess, setRegistrSuccess}) => {
    const dispatch = useDispatch()
    const statusPending = useSelector(pendingStatus);
    const authError = useSelector(state => state.auth.authErrors)
    const emailSubscribeSuccess = useSelector(state => state.different.emailSubscribeSuccess)
    const [loginModalActive, setLoginModalActive] = useState(booleanModal)
    const [loginModalClose, setLoginModalClose] = useState(false)

    const [emailSubscribe, setEmailSubscribe] = useState(emailSubscribeSuccess)
    const [emailSubscribeModalActive, setEmailSubscribeModalActive] = useState(emailSubscribe)
    const [emailSubscribeModalClose, setEmailSubscribeModalClose] = useState(false)

    const [loginError, setLoginError] = useState(authError)

    useEffect(() => {
        setLoginError(authError)
    }, [authError])

    useEffect(() => {
        setEmailSubscribe(emailSubscribeSuccess)
    }, [emailSubscribeSuccess])

    if (statusPending === 'loading') {
        return <Preloader/>
    }
    return (
        <div>
            <div className={styles.background__wrapper}>
                <div className={styles.wrapper}>
                    <div className={styles.mobile__background__wrapper}></div>
                    <div className={styles.container}>
                        <Header setLoginModalActive={setLoginModalActive} setRegistrSuccess={setRegistrSuccess}/>
                        <Main/>
                    </div>
                </div>
            </div>
            <div id='courses'>
                <Courses/>
            </div>
            <div id='workbooks'>
                <Workbooks />
            </div>
            <div id='lessons'>
                <Lessons/>
            </div>
            <div id='about-school'>
                <AboutYulia/>
            </div>
            <Footer/>
            {/*{(statusPending === 'loading') && <Preloader/>}*/}
           <Modal closePath={'/'} modalClose={loginModalClose} setModalClose={setLoginModalClose} active={loginModalActive}
                   setActive={setLoginModalActive}>
                <LoginForm langTestOpen={langTestOpen} modalClose={loginModalClose} setModalClose={setLoginModalClose}
                           loginError={loginError} setLoginError={setLoginError}/>
            </Modal>
            <Modal closePath={'/'} setModalClose={emailSubscribeModalClose} active={emailSubscribeModalActive}
                   setActive={setEmailSubscribeModalActive}>
            </Modal>
        </div>

    );
};

export default Homepage;