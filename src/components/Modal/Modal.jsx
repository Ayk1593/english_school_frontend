import React, {useState} from 'react';
import styles from './Modal.module.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearGroupLessApp, closeSubscribeModalOpen} from "../../redux/slices/differentSlice";
import {clearRegistrStatus} from "../../redux/slices/registrationSlice";

const Modal = ({closePath, active, setActive, setModalClose, children, setLangTestOver, emailSubs, grLessAppModal, registr}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const closeModal = () => {
        setModalClose(true)
        setActive(false)
        navigate(closePath)
        if (setLangTestOver) {
            setLangTestOver(false)
        }
        if (emailSubs) {
            dispatch(closeSubscribeModalOpen())
        }
        if (grLessAppModal) {
            dispatch(clearGroupLessApp())
        }
        if (registr) {
            dispatch(clearRegistrStatus())
        }
    }

    return (
        <div onClick={closeModal} className={active ? `${styles.modal} + ' ' ${styles.active}` : `${styles.modal}`}>
            <div className={styles.content_wrapper}>
                <div onClick={e => e.stopPropagation()}
                     className={active ? `${styles.modal__content} + ' ' ${styles.active}` : `${styles.modal__content}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;