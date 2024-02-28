import React, {useEffect, useState} from 'react';
import styles from './CmsUsers.module.scss'
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    clearEmailSubsNoregistrListl,
    fetchGetEmailSubsNoregistrUsers
} from "../../../redux/slices/cmsSlices/cmsUsersSlice";
import {EmailSubsNoregistrList} from "./CmsUsersComponents/CmsUsersComponents";

const CmsUsers = () => {
    const dispatch = useDispatch()
    const emailSubsNoregistrList = useSelector(state => state.cmsUsers.emailSubsNoregistrList)
    const [emailSubsNoregistrArr, setEmailSubsNoregistrArr] = useState([])
    useEffect(() => {
            return () => {
               dispatch(clearEmailSubsNoregistrListl())
            }
        },
        [])
    useEffect(() => {
            setEmailSubsNoregistrArr(emailSubsNoregistrList)
        },
        [emailSubsNoregistrList])

    const getEmailSubsNoregistrUsers = () => {
        dispatch(fetchGetEmailSubsNoregistrUsers())
    }
    return (
        <div>
            <div className={styles.email_subs_noregistr}>
                { (emailSubsNoregistrArr.length < 1) && <Button onClick={getEmailSubsNoregistrUsers} variant="contained">Получить список незарегистрированных пользователей, подписанных на Email рассылку</Button>}
                { (emailSubsNoregistrArr.length > 1) && <Button onClick={() => dispatch(clearEmailSubsNoregistrListl())} variant="contained">Скрыть список незарегистрированных пользователей, подписанных на Email рассылку</Button>}
            </div>
           <EmailSubsNoregistrList emailSubsNoregistrList={emailSubsNoregistrList} emailSubsNoregistrArr={emailSubsNoregistrArr}/>
        </div>
    );
};

export default CmsUsers;