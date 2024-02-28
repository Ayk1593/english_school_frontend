import React, {useEffect, useState} from 'react';
import styles from './Workbooks.module.scss'
import {useTranslation} from 'react-i18next';
import classNames from "classnames";
import Slider from "react-slick";
import {GrammarCard, TestCard, WorkbookCard} from "../WorkbooksCards/WorkbooksCards";
import WithWindowWidth from "../../../hoc/withWindowWidth";
import Modal from "../../../components/Modal/Modal";
import {LanguageTestInfo, SlickNext, SlickPrev} from "../../../components/SmallComponents/SmallComponents";
import {
    ByeWorkbook,
    ModalPayment,
    RegistrAfterWorkbookBye,
    SuccesRegistrRedirectPayment
} from "./ByeWorkbook/ByeWorkbook";
import SuccessRegistration from "../../Registration/SuccessRegistration/SuccessRegistration";
import {useSelector} from "react-redux";
import {registrationPendingStatus, selectRegistrationSuccess} from "../../../redux/slices/registrationSlice";
import Preloader from "../../../components/Preloader/Preloader";
import {redirect, useNavigate} from "react-router-dom";
import {selectIsAuth} from "../../../redux/slices/authSlice";


const Workbooks = ({windowWidth}) => {
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate()
    const registrAuthSuccess = useSelector(state => state.registration.registrAndAuthSuccess)
    const [registrAndAuthSuccess, setRegistrAndAuthSuccess] = useState(registrAuthSuccess)
    const statusPending = useSelector(registrationPendingStatus)
    useEffect(() => {
        setRegistrAndAuthSuccess(registrAuthSuccess)
    }, [registrAuthSuccess])
    const {t} = useTranslation();
    const [modalActiveTest, setModalActiveTest] = useState(false)
    const [modalClose, setModalClose] = useState(false)

    const [modalByeWorkbook, setModalByeWorkbook] = useState(false)

    const [modalRegistrAfterWorkbookPay, setModalRegistrAfterWorkbookPay] = useState(false)
    const [registrSuccessModalActive, setRegistrSuccessModalActive] = useState(true)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'-40px'} left={'115px'}/>,
        prevArrow: <SlickPrev bottom={'-40px'} left={'55px'}/>,
        responsive: [
            {
                breakpoint: 590,
                settings: {
                    nextArrow: <SlickNext bottom={'-60px'} left={'53%'}/>,
                    prevArrow: <SlickPrev bottom={'-60px'} left={'36%'}/>,
                }
            }
        ]
    };

    const takeTest = () => {
        if (localStorage.token || isAuth) {
            navigate('/lk/lvl-test')
        } else {
            setModalActiveTest(true)
        }
    }


    if (statusPending === 'loading') {
        return <Preloader/>
    }

    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        {t("workbooks.workbooks_title")}
                    </div>
                    <p className={styles.about_workbooks}>{t("workbooks.about_workbooks")}</p>
                    <div className={styles.cards}>
                        <div className={styles.slider__wrapper}>
                            <Slider {...settings}>
                                <WorkbookCard setModalByeWorkbook={setModalByeWorkbook}/>
                                {/*<GrammarCard/>*/}
                                {!windowWidth && <TestCard takeTest={takeTest}/>}
                            </Slider>
                        </div>

                        <div className={classNames(styles.workbook__card, styles.test__card)}>
                            <div
                                className={styles.test__span}> {t("workbooks.card_free_test")}<br/>{t("workbooks.knowledge")}
                            </div>
                            <div className={styles.circle__wrap}>
                                <div className={styles.purple__circle}>

                                </div>
                            </div>

                            <button onClick={takeTest}
                                    className={styles.workbook__btn__test}>{t("workbooks.btn_pass")}</button>

                        </div>
                    </div>


                </div>
            </div>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={modalActiveTest} setActive={setModalActiveTest}>
                <LanguageTestInfo btnClose={() => setModalActiveTest(false)}/>
            </Modal>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={modalByeWorkbook} setActive={setModalByeWorkbook}>
                <ByeWorkbook btnClose={() => setModalByeWorkbook(false)}
                             setActive={setModalByeWorkbook}
                             setActiveRegistr={setModalRegistrAfterWorkbookPay}/>
            </Modal>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={modalRegistrAfterWorkbookPay} setActive={setModalRegistrAfterWorkbookPay}
                   registr={true}>
                <RegistrAfterWorkbookBye btnClose={() => setModalRegistrAfterWorkbookPay(false)}
                                         modalClose={modalClose}
                                         setModalClose={setModalClose}
                />
            </Modal>
            {/*{(statusPending === 'loading') && <Preloader />}*/}
            {registrAndAuthSuccess && <Modal closePath={'/'} setModalClose={setModalClose}
                                             active={registrSuccessModalActive}
                                             setActive={setRegistrSuccessModalActive}>
                <SuccesRegistrRedirectPayment setRegistrAndAuthSuccess={setRegistrAndAuthSuccess}
                                              setModalRegistrAfterWorkbookPay={setModalRegistrAfterWorkbookPay}
                />
            </Modal>}
        </div>
    );
};

export default WithWindowWidth(Workbooks, 1100);