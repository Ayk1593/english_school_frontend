import React from 'react';
import styles from './Footer.module.scss'
import {Logo} from "../SmallComponents/SmallComponents";
import instagram from '../../img/footer/instagram.png'
import youtube from '../../img/footer/youtube.svg'
import vk from '../../img/footer/vk.svg'
import dzen from '../../img/footer/dzen.svg'
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";


const Footer = () => {
    const {t} = useTranslation();
    const location = useLocation()
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <Logo/>
                <div className={styles.social_networks_wrapper}>
                    <a href='https://instagram.com/happy_poppy_' target="_blank" rel="noopener noreferrer">
                        <img className={styles.social_network_img} src={instagram}/>
                    </a>
                    <a href='https://www.youtube.com/@englishbyjulia' target="_blank" rel="noopener noreferrer">
                        <img className={styles.social_network_img} src={youtube}/>
                    </a>
                    <a href='https://vk.com/englishbyjulia' target="_blank" rel="noopener noreferrer">
                        <img className={styles.social_network_img} src={vk}/>
                    </a>
                    <a href='https://dzen.ru/englishbyjulia' target="_blank" rel="noopener noreferrer">
                        <img className={styles.social_network_img} src={dzen}/>
                    </a>
                </div>
                <div className={styles.contacts_info_wrapper}>


                    <Link to='/contacts' state={{from: location}}> <span
                        className={styles.contacts_info}>{t("footer.contact_and_legal_info")} </span> </Link>
                </div>
                <span className={styles.design_and_development}>{t("footer.design_and_development")}
                    <a href='https://feodesign.xyz' target="_blank" rel="noopener noreferrer">
                        <span className={styles.agency}>Feo design agency</span></a></span>
            </div>
        </div>
    );
};

export default Footer;