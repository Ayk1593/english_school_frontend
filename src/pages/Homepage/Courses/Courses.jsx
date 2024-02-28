import React, {useEffect, useState} from 'react';
import styles from './Courses.module.scss'
import {useTranslation} from 'react-i18next';
import Slider from "react-slick";
import {BeginnerCard, EmailSubscribeCard} from "../CoursesCards/CoursesCards";
import Modal from "../../../components/Modal/Modal";
import {EmailSubscribeSuccess, SlickNext, SlickPrev} from "../../../components/SmallComponents/SmallComponents";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


const Courses = () => {
    const {t} = useTranslation();
    const emailSubscribeModalOpen = useSelector(state => state.different.emailSubscribeModalOpen)
    const emailSubsStatus = useSelector(state => state.different.emailSubsStatus)
    const [emailSubsModalActive, setEmailSubsModalActive] = useState(emailSubscribeModalOpen)
    const [popupOpacity, setPopupOpacity] = useState(0)
    const [modalClose, setModalClose] = useState(false)

    useEffect(() => {
            if (emailSubscribeModalOpen) {
                setEmailSubsModalActive(true)
            }
        },
        [emailSubscribeModalOpen])



    const clickPresentMobile = () => {
        setPopupOpacity(1);
        setTimeout(() => setPopupOpacity(0), 3000)
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'-40px'} left={'115px'}/>,
        prevArrow: <SlickPrev bottom={'-40px'} left={'55px'}/>,
        responsive: [
            {
                breakpoint: 840,
                settings: {
                    nextArrow: <SlickNext bottom={'-60px'} left={'54%'}/>,
                    prevArrow: <SlickPrev bottom={'-60px'} left={'38%'}/>
                }
            },
            {
                breakpoint: 480,
                settings: {
                    nextArrow: <SlickNext bottom={'-60px'} left={'55%'}/>,
                    prevArrow: <SlickPrev bottom={'-60px'} left={'35%'}/>
                }
            }
        ]
    };
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.title}>{t("courses.title")}</div>
                    <div
                        style={{
                            opacity: `${popupOpacity}`
                        }}
                        className={styles.popup}><p>{t("courses.present_popup")}</p></div>
                    <p className={styles.about__courses}>{t("courses.about_courses")}</p>

                    <div className={styles.slider__wrapper}>
                        <Slider {...settings}>
                            {/*<BeginnerCard clickPresentMobile={clickPresentMobile} setPopupOpacity={setPopupOpacity}/>*/}
                            <EmailSubscribeCard />
                        </Slider>
                    </div>


                </div>
            </div>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={emailSubsModalActive} setActive={setEmailSubsModalActive}
                   emailSubs={true}>
                <EmailSubscribeSuccess modalClose={modalClose} setModalClose={setModalClose}
                                       setActive={setEmailSubsModalActive}
                                       emailSubs={true}
                                       />
            </Modal>
        </div>

    );
};

export default Courses;