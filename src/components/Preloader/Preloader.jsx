import React from 'react';
import styles from './Preloader.module.scss'
import loading_auth from "../../img/homepage/loading-auth.svg";

const Preloader = () => {
    return (
        <div className={styles.pending__auth}>
            <img src={loading_auth}/>
        </div>
    );
};

export default Preloader;