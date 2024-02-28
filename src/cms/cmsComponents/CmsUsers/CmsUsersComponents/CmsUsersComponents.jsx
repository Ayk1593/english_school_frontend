import React from 'react';
import styles from './CmsUsersComponents.module.scss'

export const EmailSubsNoregistrList = ({emailSubsNoregistrList, emailSubsNoregistrArr}) => {
    return (
        <div className={styles.email_subs_noregistr_list}>
            {emailSubsNoregistrList && emailSubsNoregistrArr.map(item => <div className={styles.email_subs_noregistr_item} key={item._id} >
                <div className={styles.email_subs_item}><span>Email:</span> {item.email}</div>
                <div className={styles.email_subs_item}><span>Дата подписки:</span> {item.date}</div>
            </div>)
            }
        </div>
    );
};
