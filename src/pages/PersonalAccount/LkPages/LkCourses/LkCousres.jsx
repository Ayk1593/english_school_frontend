import React, {useEffect, useState} from 'react';
import styles from './LkCourses.module.scss'
import {useTranslation} from "react-i18next";
import {
    LkCoursesCardsMobileSlider, LkCoursesCardsSlider,
    LkTouristosCard,
} from "../../LkComponents/LkCoursesCards/LkCoursesCards";
import btn_plus from "../../../../img/lk/courses/btn_plus_mobile.svg";
import withWindowWidth from "../../../../hoc/withWindowWidth";
import classNames from "classnames";
import button_plus from "../../../../img/lk/courses/button_plus.png";
import {useSelector} from "react-redux";
import {LkSubscribeCard} from "../../LkComponents/LkExercisesCards/LkExercisesCards";
import {YouAreSubscribed} from "../../LkComponents/LkSmallComponents/LkSmallComponents";
import Modal from "../../../../components/Modal/Modal";
import {EmailSubscribeSuccess} from "../../../../components/SmallComponents/SmallComponents";


const LkCourses = ({windowWidth}) => {
    const {t} = useTranslation();
    const [modalClose, setModalClose] = useState(false)
    const courses = useSelector(state => state.auth.userData.courses)
    const [coursesArray, setCoursesArray] = useState(courses)
    const emailSubscription = useSelector(state => state.auth.userData.email_subscription)
    const [emailSubsSuccess, setEmailSubsSuccess] = useState(false)
    const addRemoveCourses = () => {
        if (coursesArray.length < 1) {
            setCoursesArray([1, 2, 3])
        } else {
            setCoursesArray(courses)
        }
    }
    return (
        <div className={styles.wrapper}>
            {windowWidth && <div className={classNames(styles.courses__wrapper,
                {[styles.wrapper_no_courses]: (coursesArray.length < 1)}
            )}>
                {/*Вернуть после появления курсов*/}
                {/*<div className={classNames(styles.courses__card__wrapper,*/}
                {/*    {[styles.courses_card_no_courses]: (coursesArray.length < 1)}*/}
                {/*)}>*/}
                {/*    */}
                {/*    <LkCoursesCardsSlider coursesArray={coursesArray}*/}
                {/*                          emailSubscription={emailSubscription}*/}
                {/*                          setEmailSubsSuccess={setEmailSubsSuccess}/>*/}
                {/* */}
                {/*</div>*/}

                {/*<div className={styles.button_plus_wrapper}*/}
                {/*     onClick={addRemoveCourses}>*/}
                {/*    <img src={button_plus}/>*/}
                {/*</div>*/}
                {/*----------------*/}

                {/*Удалить после появления курсов*/}
                {!emailSubscription && <LkSubscribeCard marginLeft={'0px'}
                                                        setEmailSubsSuccess={setEmailSubsSuccess}/>}
                {emailSubscription && <YouAreSubscribed />}
                {/*----------------*/}
            </div>}

            {!windowWidth && <LkCoursesCardsMobileSlider coursesArray={coursesArray}
                                                         emailSubscription={emailSubscription}
                                                         setEmailSubsSuccess={setEmailSubsSuccess}
            />}
            {/*Вернуть после появления курсов*/}
            {/*<div onClick={addRemoveCourses}*/}
            {/*     className={classNames(styles.mobile_btn_plus_wrapper,*/}
            {/*         {[styles.no_courses]: (coursesArray.length < 1)})}>*/}
            {/*    <img src={btn_plus}/>*/}
            {/*</div>*/}
            {/*----------------*/}
            <Modal closePath={'/lk2/courses'} modalClose={modalClose} setModalClose={setModalClose}
                   active={emailSubsSuccess} setActive={setEmailSubsSuccess}>
                <EmailSubscribeSuccess modalClose={modalClose} setModalClose={setModalClose}
                                       setActive={setEmailSubsSuccess}/>
            </Modal>
        </div>
    );
};

export default withWindowWidth(LkCourses, 550);