import React, {useEffect, useState} from 'react';
import styles from './Lessons.module.scss'
import yulia_icon from '../../../img/lessons/yulia_icon.png'
import planet from '../../../img/lessons/planet.png'
import stars from '../../../img/lessons/stars.png'
import {useTranslation} from 'react-i18next';
import Modal from "../../../components/Modal/Modal";
import {
    GroupLessonsApplication,
    GroupLessonsApplicationSuccess
} from "../../../components/GroupLessonsApplication/GroupLessonsApplication";
import {useSelector} from "react-redux";
import {LanguageTestInfo} from "../../../components/SmallComponents/SmallComponents";

const Lessons = () => {
    const {t} = useTranslation();

    const grLessAppSuccess = useSelector(state => state.different.grLessAppSuccess)
    const [grLessAppOk, setGrLessAppOk] = useState(grLessAppSuccess)

    const [opacity, setOpacity] = useState(0)
    const [modalActiveApplication, setModalActiveApplication] = useState(false)
    const [modalClose, setModalClose] = useState(false)
    const [modalActiveTestInfo, setModalActiveTestInfo] = useState(false)

    useEffect(() => {
        setGrLessAppOk(grLessAppSuccess)
    }, [grLessAppSuccess])

    useEffect(() => {
        setTimeout(() => setOpacity(1), 2000)
    }, [])

    const application = () => {
        setModalActiveApplication(true)
    }
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <img className={styles.yulia__icon} src={yulia_icon}/>
                <div className={styles.container}>
                    <div className={styles.title}>{t("lessons.group_lessons")}</div>

                    <div className={styles.about__lessons}>
                        {t("lessons.about_lessons")}
                    </div>
                    <div className={styles.lessons__card__wrapper}>

                        <div className={styles.lessons__card__container}>
                            <div className={styles.purple__circle}>
                                <img src={stars}/>
                            </div>
                            <div className={styles.lessons__card}>
                                <p className={styles.paragraph}>{t("lessons.i_invite_you")} <span
                                    className={styles.highlighting}>{t("lessons.free_conversation")}</span>
                                    {t("lessons.at_which_time")}</p>
                                <div className={styles.ul__wrapper}>
                                    <ul>
                                        <li>{t("lessons.tell_me_about_yourself")}</li>
                                        <li>{t("lessons.ask_questions")}</li>
                                        <li>{t("lessons.vocabulary")}</li>
                                    </ul>


                                </div>
                                <div className={styles.yellow__circle}>
                                    <img src={planet}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btn__container}>

                        <div className={styles.btn__wrapper}>
                            <button onClick={application}
                                    className={styles.application__btn}>{t("lessons.btn_submit")}</button>
                            <div className={styles.popup} style={{
                                opacity: `${opacity}`
                            }}>
                                <p>{t("lessons.submit_your_application")}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={modalActiveApplication} setActive={setModalActiveApplication}
                   grLessAppModal={true}>
                {!grLessAppOk && <GroupLessonsApplication modalClose={modalClose} setModalClose={setModalClose}
                                                               setModalActiveTestInfo={setModalActiveTestInfo}/> }
                {grLessAppOk && <GroupLessonsApplicationSuccess modalClose={modalClose} setModalClose={setModalClose}
                                                 setActive={setModalActiveApplication}/>}
            </Modal>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={modalActiveTestInfo} setActive={setModalActiveTestInfo}>
                <LanguageTestInfo btnClose={() => setModalActiveTestInfo(false)}/>
            </Modal>
        </div>
    );
};

export default Lessons;