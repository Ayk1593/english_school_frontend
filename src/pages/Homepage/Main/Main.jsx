import React from 'react';
import styles from './Main.module.scss'
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Main = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <div className={styles.main__wrapper}>
            <div className={styles.about__courses}>
                {t("main.about_courses1")}
               <span className={styles.english__language}>{t("main.english_language")}</span>
                {t("main.about_courses2")}
            </div>
           <button onClick={() => navigate('/registration')} className={styles.btn}>{t("main.btn_free_access")}</button>
        </div>
    );
};

export default Main;