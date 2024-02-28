import React from 'react';
import styles from './CmsHomepage.module.scss'
import CmsNav from "../cmsComponents/cmsNav/CmsNav";
import CmsMain from "../cmsComponents/cmsMain/CmsMain";
import {Link} from "react-router-dom";

const CmsHomepage = () => {
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
               <Link to='/lk'> <button className={styles.btn_back_lk}>Вернуться в ЛК</button> </Link>
                <div className={styles.container}>
                    <CmsNav/>
                    <CmsMain/>
                </div>
            </div>
        </div>
    );
};

export default CmsHomepage;