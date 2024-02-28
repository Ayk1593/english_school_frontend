import React from 'react';
import styles from './AboutYulia.module.scss'
import yulia_photo from '../../../img/about-school/yulia_photo.svg'
import animation from '../../../img/about-school/animation.png'
import animation_mobile from '../../../img/about-school/animation_mobile.png'
import {useTranslation} from 'react-i18next';


const AboutYulia = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                   <div className={styles.title}>
                       <img src={yulia_photo} className={styles.yulia__photo}/>
                      <span className={styles.title__span}>  {t("about_school.about_yulia")} </span>
                   </div>
                    <ul className={styles.about__yulia}>
                        <li>{t("about_school.li_1")} </li>
                        <li>{t("about_school.li_2")} </li>
                        <li>{t("about_school.li_3")} </li>
                        <li>{t("about_school.li_4")} </li>
                        <li>{t("about_school.li_5")}</li>
                    </ul>
                    <div className={styles.li__without__list}>{t("about_school.li_without_list")}<span className={styles.highlighting}>{t("about_school.language_coaching")}</span>. {t("about_school.li_without_list2")}</div>
                    <ul className={styles.second__li}>
                        <li>{t("about_school.li_5")}</li>
                    </ul>

                    <div className={styles.slogan}>{t("about_school.slogan")}
                        <img src={animation} className={styles.animation}/>
                        <img src={animation_mobile} className={styles.animation__mobile}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutYulia;