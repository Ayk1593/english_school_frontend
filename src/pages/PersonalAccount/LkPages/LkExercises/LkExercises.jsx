import React, {useEffect, useState} from 'react';
import styles from './LkExercises.module.scss'
import {
    LkExercisesCardsMobileSlider, LkExercisesCardsSlider,
    LkGrammarCard,
    LkSubscribeCard
} from "../../LkComponents/LkExercisesCards/LkExercisesCards";
import button_plus from "../../../../img/lk/courses/button_plus.png";
import btn_plus from "../../../../img/lk/courses/btn_plus_mobile.svg";
import WithWindowWidth from "../../../../hoc/withWindowWidth";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import Modal from "../../../../components/Modal/Modal";
import {EmailSubscribeSuccess} from "../../../../components/SmallComponents/SmallComponents";
import {YouAreSubscribed} from "../../LkComponents/LkSmallComponents/LkSmallComponents";

const LkExercises = ({windowWidth}) => {
    const [modalClose, setModalClose] = useState(false)
    const emailSubscription = useSelector(state => state.auth.userData.email_subscription)
    const [emailSubsSuccess, setEmailSubsSuccess] = useState(false)
    const exercisesBoolean = useSelector(state => state.auth.userData.lessons)
    const [exercisesArray, setExercisesArray] = useState(exercisesBoolean)

    return (
        <div className={styles.wrapper}>
            {windowWidth &&
                <div className={classNames(styles.exercises__wrapper,
                    {[styles.wrapper_no_courses]: exercisesArray.length < 1})}>

                    {/*Удалить после появления курсов*/}
                    {!emailSubscription && <LkSubscribeCard marginLeft={'0px'}
                                                            setEmailSubsSuccess={setEmailSubsSuccess}/>}
                    {emailSubscription && <YouAreSubscribed />}
                    {/*----------------*/}

                    {/*Вернуть после появления курсов*/}
                    {/*{exercisesBought && <LkExercisesCardsSlider emailSubscription={emailSubscription}*/}
                    {/*                                            exercisesBought={exercisesBought}*/}
                    {/*                                            setEmailSubsSuccess={setEmailSubsSuccess}/>}*/}

                    {/*<div onClick={() => setExercisesBought(!exercisesBought)}*/}
                    {/*     className={styles.button_plus_wrapper}>*/}
                    {/*    <img src={button_plus}/>*/}
                    {/*</div>*/}
                    {/*----------------*/}
                </div>}

            {!windowWidth && <LkExercisesCardsMobileSlider emailSubscription={emailSubscription}
                                                           exercisesBought={exercisesArray}
                                                           setEmailSubsSuccess={setEmailSubsSuccess}/>}
            {/*Вернуть после появления курсов*/}
            {/*<div onClick={() => setExercisesBought(!exercisesBought)}*/}
            {/*     className={classNames(styles.mobile_btn_plus_wrapper,*/}
            {/*         {[styles.no_courses]: (!exercisesBought && emailSubscription)})}>*/}
            {/*    <img src={btn_plus}/>*/}
            {/*</div>*/}
            {/*----------------*/}

            <Modal closePath={'/lk2/exercises'} modalClose={modalClose} setModalClose={setModalClose}
                   active={emailSubsSuccess} setActive={setEmailSubsSuccess}>
                <EmailSubscribeSuccess modalClose={modalClose} setModalClose={setModalClose}
                                       setActive={setEmailSubsSuccess}/>
            </Modal>
        </div>
    );
};

export default WithWindowWidth(LkExercises, 740);