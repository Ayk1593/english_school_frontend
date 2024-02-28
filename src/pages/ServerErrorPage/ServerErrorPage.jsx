import React, {useEffect, useState} from 'react';
import styles from './ServerErrorPage.module.scss'
import {Link} from "react-router-dom";
import {BtnClose} from "../../components/SmallComponents/SmallComponents";
import loadingGif from '../../img/loading/payment-redirect_load.gif'
import {useTranslation} from "react-i18next";
import Modal from "../../components/Modal/Modal";


export const ServerErrorPage = () => {
    const [modalClose, setModalClose] = useState(false)
    const [active, setActive] = useState(true)
    return (
        <div className={styles.server_error_modal_wrapper}>
            <div className={styles.server_error_modal_container}>
            </div>

            <Modal closePath={'/'} setModalClose={setModalClose}
                   active={active} setActive={setActive}>
                <ServerErrorPageContent/>
            </Modal>
        </div>
    );
};

export const ServerErrorPageContent = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.server_error_wrapper}>
            <div className={styles.server_error_container}>
                <div className={styles.btn_close}><Link to='/'><BtnClose/> </Link></div>
                <div className={styles.text_wrapper}>
                    <div className={styles.error_text}>
                        {t("server_error_page.server_error1")}
                    </div>
                    <div className={styles.error_text}>
                        {t("server_error_page.server_error2")}
                    </div>
                    <img className={styles.loading} src={loadingGif}/>
                </div>
            </div>
        </div>
    );
};

