import React, {useState} from 'react';
import styles from './WorkbooksCards.module.scss'
import {useTranslation} from "react-i18next";
import workbook_img from "../../../img/workbooks/workbook_img.png";
import workbook_img_mobile from "../../../img/workbooks/workbook_img_mobile.png";
import books_icon from "../../../img/workbooks/books_icon.png";
import clock_icon from "../../../img/workbooks/clock_icon.png";
import check_icon from "../../../img/workbooks/check_icon.png";
import classNames from "classnames";
import grammar_img from "../../../img/workbooks/grammar_img.png";
import grammar_img_mobile from "../../../img/workbooks/grammar_img_mobile.png";
import key_icon from "../../../img/workbooks/key_icon.png";
import file_icon from "../../../img/workbooks/file_icon.png";
import green_check_icon from "../../../img/workbooks/green_check_icon.png";
import Modal from "../../../components/Modal/Modal";
import {LanguageTestInfo} from "../../../components/SmallComponents/SmallComponents";


export const WorkbookCard = ({setModalByeWorkbook}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.workbook__card__wrapper}>
        <div className={styles.workbook__card}>
            <div className={styles.workbook__title}>
                {t("workbooks.workbooks_card_title")}
            </div>

            <img className={styles.workbook__img} src={workbook_img}/>
            <img className={styles.workbook__img__mobile} src={workbook_img_mobile}/>

            <div className={styles.about__icons}>
                <div className={styles.about__icon}>
                    <img src={books_icon}/>
                    <div>{t("workbooks.level")}</div>
                </div>
                <div className={styles.about__icon}>
                    <img src={clock_icon}/>
                    <div>{t("workbooks.about_times")}</div>
                </div>
                <div className={styles.about__icon}>
                    <img src={check_icon}/>
                    <div>{t("workbooks.exercises")}</div>
                </div>
            </div>

            <button onClick={() => setModalByeWorkbook(true)} className={styles.workbook__btn}>{t("workbooks.btn_bye")}</button>

        </div>

        </div>
    )

}


export const GrammarCard = ({ }) => {
    const {t} = useTranslation();
    return (
        <div className={styles.grammar__card__wrapper}>
        <div className={classNames(styles.workbook__card, styles.grammar__card)}>
            <div className={classNames(styles.workbook__title, styles.grammar__title)}>
                {t("workbooks.grammar_card_title")}
            </div>
            <img className={classNames(styles.workbook__img, styles.grammar__img)} src={grammar_img}/>
            <img className={styles.grammar_img_mobile} src={grammar_img_mobile}/>

            <div className={classNames(styles.about__icons, styles.about__icons__mobile)}>
                <div className={styles.about__icon}>
                    <img src={key_icon}/>
                    <div>{t("workbooks.difficulty_levels")}</div>
                </div>
                <div className={styles.about__icon}>
                    <img src={file_icon}/>
                    <div>{t("workbooks.grouped_by_topic")}</div>
                </div>
                <div className={styles.about__icon}>
                    <img src={green_check_icon}/>
                    <div>{t("workbooks.self_check")}</div>
                </div>
            </div>
            <button className={styles.workbook__btn}>{t("workbooks.btn_bye")}</button>
        </div>
        </div>
    )

}



export const TestCard = ({takeTest}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.test__card__wrapper}>
        <div className={classNames(styles.workbook__card, styles.test__card__mobile)}>
            <div
                className={styles.test__span}> {t("workbooks.card_free_test")}<br/>{t("workbooks.knowledge")}
            </div>
            <div className={styles.circle__wrap}>
                <div className={styles.purple__circle}>

                </div>
            </div>

            <button onClick={takeTest} className={styles.workbook__btn__test}>{t("workbooks.btn_pass")}</button>

        </div>
        </div>
    )

}