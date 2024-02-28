import React from 'react';
import styles from './CmsNav.module.scss'
import {NavLink} from "react-router-dom";


const CmsNav = () => {
    const setActive = ({isActive}) => isActive ? `${styles.active_link}` : ''

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div className={styles.item}>
                    <NavLink to='/cms' className={setActive}>Главная</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/cms2/courses' className={setActive}>Курсы</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink  to='/cms2/lessons' className={setActive}>Уроки</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/cms2/workbooks'className={setActive}>Рабочая тетрадь</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/cms2/users'className={setActive}>Пользователи</NavLink>
                </div>
            </div>

        </div>
    );
};

export default CmsNav;