import React, {useState} from 'react';
import styles from './LkWorkbooks.module.scss'
import {
    LkWorkbookCard,
    LkWorkbookCardsMobileSlider,
    LkWorkbookCardsSlider
} from "../../LkComponents/LkWorkbooksCards/LkWorkbooksCards";
import button_plus from "../../../../img/lk/courses/button_plus.png";
import btn_plus from "../../../../img/lk/courses/btn_plus_mobile.svg";
import withWindowWidth from "../../../../hoc/withWindowWidth";
import {useSelector} from "react-redux";
import classNames from "classnames";
import Modal from "../../../../components/Modal/Modal";
import {ByeWorkbook} from "../../../Homepage/Workbooks/ByeWorkbook/ByeWorkbook";

const LkWorkbooks = ({windowWidth}) => {
    const workbooksBoolean = useSelector(state => state.auth.userData.workbook)
    const [workbooksBought, setWorkbooksBought] = useState(workbooksBoolean)
    const [modalClose, setModalClose] = useState(false)
    const [modalByeWorkbook, setModalByeWorkbook] = useState(false)
    return (
        <div className={styles.wrapper}>
            { windowWidth && <div className={classNames(styles.workbooks__wrapper,
                {[styles.wrapper_no_courses]: !workbooksBought})}>
                <LkWorkbookCardsSlider workbooksBought={workbooksBought}
                                       setModalByeWorkbook={setModalByeWorkbook}/>

                {/*Вернуть после появления курсов*/}
                {/*<div onClick={() => setWorkbooksBought(!workbooksBought)}*/}
                {/*    className={styles.button_plus_wrapper}>*/}
                {/*    <img src={button_plus}/>*/}
                {/*</div>*/}
                {/*----------------*/}
            </div> }

            { !windowWidth && <LkWorkbookCardsMobileSlider workbooksBought={workbooksBought}
                                                           setModalByeWorkbook={setModalByeWorkbook}/> }

            {/*Вернуть после появления курсов*/}
            {/*<div onClick={() => setWorkbooksBought(!workbooksBought)}*/}
            {/*     className={classNames(styles.mobile_btn_plus_wrapper,*/}
            {/*         {[styles.no_courses]: !workbooksBought})}>*/}
            {/*    <img src={btn_plus}/>*/}
            {/*</div>*/}
            {/*----------------*/}

            <Modal closePath={'/lk2/workbooks'} modalClose={modalClose} setModalClose={setModalClose}
                   active={modalByeWorkbook} setActive={setModalByeWorkbook}>
                <ByeWorkbook btnClose={() => setModalByeWorkbook(false)}
                             setActive={setModalByeWorkbook}
                             isLk={true}
                           />
            </Modal>
        </div>
    );
};

export default  withWindowWidth(LkWorkbooks, 740);