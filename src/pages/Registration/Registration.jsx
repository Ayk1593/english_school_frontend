import React, {useEffect, useState} from 'react';
import styles from './Registration.module.scss'
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {clearRegistrErrors, clearRegistrStatus, registrationPendingStatus,} from "../../redux/slices/registrationSlice";
import Modal from "../../components/Modal/Modal";
import SuccessRegistration from "./SuccessRegistration/SuccessRegistration";
import Preloader from "../../components/Preloader/Preloader";
import {BtnClose} from "../../components/SmallComponents/SmallComponents";
import {Link, Navigate} from "react-router-dom";
import RegistrationForm from "./RegistrForm/RegistrationForm";
import {selectIsAuth} from "../../redux/slices/authSlice";

const Registration = ({registrSuccess, setRegistrSuccess, langTestOpen}) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth);
    const statusPending = useSelector(registrationPendingStatus)
    const [modalClose, setModalClose] = useState(false)
    const [registrSuccessModalActive, setRegistrSuccessModalActive] = useState(true)

    const {t} = useTranslation();

    const closeRegistr = () => {
        dispatch(clearRegistrErrors())
        dispatch(clearRegistrStatus())
    }


    // if (registrationSuccess) {
    //     return <Navigate to='/login'/>
    // }
    if (localStorage.token || isAuth)  {
        return <Navigate to='/lk'/>
    }
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.registration__window}>
                        <div className={styles.btn_close}
                             onClick={closeRegistr}><Link to='/'><BtnClose /> </Link></div>
                        <div className={styles.window__container}>
                            <div className={styles.title}>
                                {t("registration.registration")}
                            </div>

                            <RegistrationForm registrType={'standard'}/>
                        </div>
                    </div>
                </div>
            </div>
            {(statusPending === 'loading') && <Preloader />}

            {registrSuccess && <Modal closePath={'/'} setModalClose={setModalClose}
                                      active={registrSuccess} setActive={setRegistrSuccess}>
                <SuccessRegistration setRegistrSuccess={setRegistrSuccess} langTestOpen={langTestOpen}/>
            </Modal>}
        </div>
    )
        ;
};

export default Registration;