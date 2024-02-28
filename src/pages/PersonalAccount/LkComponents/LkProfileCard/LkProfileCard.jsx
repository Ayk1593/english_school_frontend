import React, {useEffect, useRef, useState} from 'react';
import styles from './LkProfileCard.module.scss'
import classNames from "classnames";
import checkbox_name from "../../../../img/lk/checkbox_name.svg";
import change_name_icon from "../../../../img/lk/change_name_icon.svg";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, fetchChangeAvatar, fetchChangeName, selectIsAuth} from "../../../../redux/slices/authSlice";

const LkProfileCard = ({langLevel, setLangTestModalActive}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [popupOpacity, setPopupOpacity] = useState(0)
    const [disableName, setDisableName] = useState(true)

    const avatar = useSelector((state) => state.auth.avatar)
    const avatarLoaded = useSelector((state) => state.auth.avatarLoaded)
    const [profilePhoto, setProfilePhoto] = useState(avatar)
    const [avatarError, setAvatarError] = useState(false)

    const profileName = useSelector((state) => state.auth.userName)

    const [userName, setUserName] = useState(profileName)
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false)
    const [nameError, setNameError] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        const fakeParams = Date.now()
        setProfilePhoto(`${avatar + '?' + fakeParams}`)
    }, [avatarLoaded, avatar])

    useEffect(() => {
        setUserName(profileName)
    }, [profileName])


    useEffect(() => {
        if (!disableName) {
            inputRef.current.focus()
        }
    }, [disableName])
    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()
        const nameObject = {
            name: userName
        }
        if (nameObject.name.length < 2 || nameObject.name.length > 30) {
            setNameError(true)
        } else {
            setNameError(false)
            dispatch(fetchAuthMe()).then
            (() => {
                if (userName !== profileName) {
                    dispatch(fetchChangeName(nameObject))
                }
            })
            setDisableName(true)
        }
    }
    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    // Функция активации поля ввода имени по клику на карандаш
    const handleNameDisable = () => {
        setDisableName(false)
    }

    // Отправка фото профиля на сервер
    const changePhoto = async (e) => {
        if (e.target.files.length) {
            const response = await dispatch(fetchChangeAvatar(e.target.files[0]))
            if (response.type === 'auth/fetchChangeAvatar/rejected') {
                setAvatarError(true)
            } else {
                setAvatarError(false)
            }
        }
    }
    return (
            <div className={styles.profile_card}>
                <div className={styles.photo_container}>
                    <div className={styles.photo_circle}>
                        <img className={styles.avatar_container} src={profilePhoto} className={styles.avatar}/>
                    </div>
                    <input onChange={changePhoto} id='file-input' name='avatar' type='file' multiple
                           accept='.jpg, .jpeg, .png'/>
                    <label htmlFor='file-input'>
                        <div className={styles.btn_add_photo}></div>
                    </label>
                    <div className={classNames(styles.avatar_error)}>
                        {avatarError &&
                            <div>Фото должно быть в формате jpg, jpeg или png размером не более 500кб</div>}</div>
                </div>
                <div className={styles.profile_info}>
                    <div className={styles.profile_name_wrapper}>
                        <div className={styles.profile_name}>

                            <form onSubmit={onSubmit}>

                                <input value={userName} disabled={disableName} ref={inputRef}
                                       onChange={handleChange}
                                       className={classNames(styles.name_input, {[styles.error_border]: nameError})}
                                />
                                {!disableName &&
                                    <button disabled={submitBtnDisable} type='submit' className={styles.checkbox_name}>
                                        <img src={checkbox_name}/>
                                    </button>}
                            </form>
                            <div className={styles.error}> {nameError &&
                                <div>Введите от 2 до 30 символов</div>}
                            </div>

                        </div>

                        {disableName && <div onClick={handleNameDisable} className={styles.change_name_icon}>
                            <img onMouseOver={() => setPopupOpacity(1)} onMouseLeave={() => setPopupOpacity(0)}
                                 src={change_name_icon}/>
                            <div style={{
                                opacity: `${popupOpacity}`
                            }}
                                 className={styles.popup_change_name}>
                                {t("lk_profile.change_name")}
                            </div>
                        </div>}
                    </div>
                    <div className={styles.english_level_wrapper}>
                        <span>{t("lk_profile.english_level")} <span
                            className={styles.level}>{langLevel}</span></span>
                    </div>
                    <span onClick={() => setLangTestModalActive(true)}
                          className={styles.take_test}>{t("lk_profile.take_test")}</span>

                </div>
            </div>
    );
};

export default LkProfileCard;