import React from 'react';
import styles from './Loading.module.scss'
import loading from '../../img/loading/loading.gif'

const Loading = () => {
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                     <img src={loading}/>
                </div>
            </div>
        </div>
    )
        ;
};

export default Loading;