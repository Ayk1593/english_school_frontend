import React, {useEffect, useState} from 'react';
import styles from './EnglishPlug.module.scss'
import {EmailSubscribeSuccess, Logo} from "../../components/SmallComponents/SmallComponents";
import {Link} from "react-router-dom";
import russian_flag from '../../img/homepage/russian-flag.svg'
import Footer from "../../components/Footer/Footer";
import {useForm} from "react-hook-form";
import {fetchEmailSubscribe} from "../../redux/slices/differentSlice";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/Modal/Modal";
import classNames from "classnames";

const EnglishPlug = () => {
    const dispatch = useDispatch()
    const emailSubscribeModalOpen = useSelector(state => state.different.emailSubscribeModalOpen)
    const [emailSubsModalActive, setEmailSubsModalActive] = useState(emailSubscribeModalOpen)
    const [modalClose, setModalClose] = useState(false)
    useEffect(() => {
            if (emailSubscribeModalOpen) {
                setEmailSubsModalActive(true)
            }
        },
        [emailSubscribeModalOpen])

    const {
        register,
        formState: {
            errors, isValid
        }, handleSubmit,
        reset,
        clearErrors
    } = useForm()


    const onSubmit = (data) => {
        dispatch(fetchEmailSubscribe(data))
        reset()
    }
    return (
        <div className={styles.background__wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.mobile__background__wrapper}></div>
                <div className={styles.container}>
                    <header className={styles.header_en}>
                        <Logo hrefLogo={'/'}/>


                        <div className={styles.login__language__wrapper}>

                            <Link to='/'>
                                <div className={styles.language__logo}>
                                    <img src={russian_flag}/>
                                </div>
                            </Link>
                        </div>

                    </header>

                    <div className={styles.main__wrapper}>
                        <div className={styles.about__courses}>
                            Hi, my name is Julia! I am an English teacher.
                            Soon I will start my online school so that you can learn English for fun!
                        </div>
                    </div>
                    <div className={styles.input_btn_wrapper}>
                        <div className={styles.input_label}>Subscribe so as not to miss the launch</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            onBlurCapture={() => clearErrors()} {...register('email', {
                            required: "Enter the correct E-mail",
                            pattern: {value: /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/, message: "Enter the correct E-mail"}
                        })}
                            placeholder='YOUR E-MAIL'
                            className={classNames(styles.input_subscribe, {[styles.error_border]: errors.email?.message})}/>
                        <div className={styles.error}> {errors?.email &&
                            <div>{errors?.email?.message || "Enter the correct E-mail"}</div>}</div>
                            <button type='submit' className={styles.btn_en}>subscribe</button>
                        </form>

                    </div>

                </div>
            </div>
            <Footer/>
            <Modal closePath={'/'} modalClose={modalClose} setModalClose={setModalClose}
                   active={emailSubsModalActive} setActive={setEmailSubsModalActive}
                   emailSubsErrors={true}>
                <EmailSubscribeSuccess modalClose={modalClose} setModalClose={setModalClose}
                                       setActive={setEmailSubsModalActive}
                                       emailSubsErrors={true}
                />
            </Modal>
        </div>
    );
};

export default EnglishPlug;