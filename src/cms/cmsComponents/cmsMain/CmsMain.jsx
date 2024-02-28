import React from 'react';
import styles from './CmsMain.module.scss'
import {useLocation} from "react-router-dom";
import CmsCourses from "../CmsCourses/CmsCourses";
import CmsWorkbooks from "../CmsWorkbooks/CmsWorkbooks";
import CmsUsers from "../CmsUsers/CmsUsers";

const CmsMain = () => {
    const url = useLocation()
    return (
        <div className={styles.wrapper}>
            {url.pathname === '/cms2/courses' && <CmsCourses/>}
            {url.pathname === '/cms2/workbooks' && <CmsWorkbooks/>}
            {url.pathname === '/cms2/users' && <CmsUsers/>}
        </div>
    );
};

export default CmsMain;