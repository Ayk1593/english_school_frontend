import React, {useEffect, useRef, useState} from 'react';
import styles from './LkProfile.module.scss'
import {useTranslation} from "react-i18next";
import change_name_icon from '../../../../img/lk/change_name_icon.svg'
import checkbox_name from '../../../../img/lk/checkbox_name.svg'
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, fetchChangeAvatar, fetchChangeName, selectIsAuth} from "../../../../redux/slices/authSlice";
import Modal from "../../../../components/Modal/Modal";
import {LkLanguageTestResult, LkLanguageTestSlider} from "../../LkComponents/LkLanguageTest/LkLanguageTest";
import LkProfileCard from "../../LkComponents/LkProfileCard/LkProfileCard";
import {SlickNext, SlickPrev} from "../../../../components/SmallComponents/SmallComponents";
import Slider from "react-slick";
import {LkWorkbookCard} from "../../LkComponents/LkWorkbooksCards/LkWorkbooksCards";
import LkPaymentCard from "../../LkComponents/LkPaymentCard/LkPaymentCard";


const LkProfile = ({langTestOpen}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const [langTestModalActive, setLangTestModalActive] = useState(langTestOpen)
    const [langTestModalClose, setLangTestModalClose] = useState(false)

    const [langTestOver, setLangTestOver] = useState(false)
    const [testResult, setTestResult] = useState(0)

    const languageLevel = useSelector((state) => state.auth.langLevel)
    const [langLevel, setLangLevel] = useState(languageLevel)

    useEffect(() => {
        setLangLevel(languageLevel)
    }, [languageLevel])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'-32px'} left={'125px'}/>,
        prevArrow: <SlickPrev bottom={'-32px'} left={'70px'}/>,
        responsive: [
            {
                breakpoint: 1360,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    nextArrow: <SlickNext bottom={'-32px'} left={'172px'}/>,
                    prevArrow: <SlickPrev bottom={'-32px'} left={'114px'}/>,
                }
            }
        ]
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.cards_wrapper}>
                    <LkProfileCard langLevel={langLevel} setLangTestModalActive={setLangTestModalActive}/>
                    <LkPaymentCard/>
            </div>

            <Modal closePath={'/lk'}
                   setLangTestOver={setLangTestOver}
                   setModalClose={setLangTestModalClose} active={langTestModalActive}
                   setActive={setLangTestModalActive}>
                {!langTestOver && <LkLanguageTestSlider setLangTestOver={setLangTestOver}
                                                        testResult={testResult}
                                                        setTestResult={setTestResult}/>}
                {langTestOver && <LkLanguageTestResult testResult={testResult} setActive={setLangTestModalActive}
                                                       setLangTestOver={setLangTestOver}
                />}
            </Modal>
        </div>
    );
};

export default LkProfile;