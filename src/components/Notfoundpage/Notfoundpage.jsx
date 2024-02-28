import React from 'react';
import styles from './Notfoundpage.module.scss'

const Notfoundpage = () => {
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.text__container}>
                        <div className={styles.error404}>404</div>
                        <div className={styles.text__info}> Ничего не найдено</div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Notfoundpage;