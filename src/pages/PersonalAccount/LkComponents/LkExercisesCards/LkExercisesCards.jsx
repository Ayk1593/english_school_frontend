import React, {useState, useEffect, useRef} from 'react';
import styles from './LkExercisesCards.module.scss'
import classNames from "classnames";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import grammar_img from "../../../../img/workbooks/grammar_img.png";
import key_icon from "../../../../img/workbooks/key_icon.png";
import file_icon from "../../../../img/workbooks/file_icon.png";
import green_check_icon from "../../../../img/workbooks/green_check_icon.png";
import {SampleNextArrow, SamplePrevArrow} from "../../../../components/SliderArrows/SliderArrows";
import Slider from "react-slick";
import {fetchEmailSubscribe} from "../../../../redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {SlickNext, SlickPrev} from "../../../../components/SmallComponents/SmallComponents";
import {YouAreSubscribed} from "../LkSmallComponents/LkSmallComponents";


export const LkGrammarCard = () => {
    const {t} = useTranslation();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const arrayRatingItem = document.querySelectorAll(`.${styles.rating_item}`)
        arrayRatingItem.forEach((element, index) => {
            const newIndex = index + 1
            if (newIndex <= rating) {
                element.style.backgroundColor = '#FFE814';
            }
        });
    }, [rating])
    setTimeout(() => setRating(2), 1000)
    return (
        <div className={styles.grammar__card__wrapper}>
            <div className={classNames(styles.workbook__card, styles.grammar__card)}>
                <div className={classNames(styles.workbook__title, styles.grammar__title)}>
                    {t("workbooks.grammar_card_title")}
                </div>
                <img className={classNames(styles.workbook__img, styles.grammar__img)} src={grammar_img}/>
                {/*<img className={styles.grammar_img_mobile} src={grammar_img_mobile}/>*/}

                <div className={classNames(styles.about__icons, styles.about__icons__mobile)}>
                    <div className={styles.about__icon}>
                        <img src={key_icon}/>
                        <div>{t("workbooks.difficulty_levels")}</div>
                    </div>
                    <div className={styles.about__icon}>
                        <img src={file_icon}/>
                        <div>{t("workbooks.grouped_by_topic")}</div>
                    </div>
                    <div className={styles.about__icon}>
                        <img src={green_check_icon}/>
                        <div>{t("workbooks.self_check")}</div>
                    </div>
                </div>
                <span className={styles.your_progress}>{t("lk_courses.your_progress")}</span>
                <div className={styles.rating_wrapper}>
                    <div className={styles.rating_item}></div>
                    <div className={styles.rating_item}></div>
                    <div className={styles.rating_item}></div>
                    <div className={styles.rating_item}></div>
                    <div className={styles.rating_item}></div>
                    <div className={styles.rating_item}></div>
                </div>
            </div>
        </div>
    )
}


export const LkSubscribeCard = ({setEmailSubsSuccess, marginLeft}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const {
        register,
        formState: {
            errors, isValid
        }, handleSubmit,
        reset,
        clearErrors
    } = useForm()
    const onSubmit = async (data) => {
        const dataObj = {
            "email_subscription": true
        }
        const response = await dispatch(fetchEmailSubscribe(dataObj))
        if (response.payload.email_subscription) {
            setEmailSubsSuccess(true)
        }
        reset()
    }
    return (
        <div className={styles.subscribe__card__wrapper}>
            <div style={{marginLeft: `${marginLeft}`}} className={styles.subscribe__card}>
                <p className={styles.text}>{t("courses.second_card_about")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.subscribe}>
                        <div className={styles.form__input}>
                            <input onBlurCapture={() => clearErrors()} {...register('email', {
                                required: "Поле E-MAIL не заполнено",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                    message: "Введите корректный E-mail"
                                }
                            })}
                                   placeholder={t("courses.your_email")}
                                   className={classNames(styles.input_email, {[styles.error_border]: errors.email?.message})}/>
                            <div className={styles.error}> {errors?.email &&
                                <div>{errors?.email?.message || "Введите корректный E-MAIL"}</div>}</div>
                        </div>
                        <button type='submit' className={styles.btn}>{t("courses.subscribe")}</button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export const LkExercisesCardsSlider = ({emailSubscription, exercisesBought, setEmailSubsSuccess}) => {
    const sliderRef = useRef()
    const [countSlide, setCountSlide] = useState(null)
    useEffect(() => {
        setCountSlide(sliderRef.current.props.children.length)
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'-29px'} left={'125px'}/>,
        prevArrow: <SlickPrev bottom={'-29px'} left={'70px'}/>,
    };
    return (
        <div className={classNames({[styles.slider_wrapper]: exercisesBought})}>
            <Slider ref={sliderRef} {...settings}>
                {exercisesBought.length > 0 && <LkGrammarCard/>}
                {(countSlide < 4) && (emailSubscription) && <div className={styles.empty_second_plug}></div> }
                {!emailSubscription && <LkSubscribeCard setEmailSubsSuccess={setEmailSubsSuccess}/> }
                {(countSlide < 4) && (!emailSubscription) && <div className={styles.empty_second_plug}></div> }


            </Slider>
        </div>
    )
}

export const LkExercisesCardsMobileSlider = ({emailSubscription, exercisesBought, setEmailSubsSuccess}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'36px'} left={'189px'}/>,
        prevArrow: <SlickPrev bottom={'36px'} left={'90px'}/>,
    };
    return (
        <div className={styles.mobile_slider_wrapper}>
            <Slider {...settings}>
                {/*Вернуть после появления курсов*/}
                {/*{exercisesBought.length > 0 && <LkGrammarCard/>}*/}
                {/*-------------*/}

                {!emailSubscription && <LkSubscribeCard setEmailSubsSuccess={setEmailSubsSuccess}/>}

                {/*Удалить после появления курсов*/}
                {emailSubscription && <YouAreSubscribed />}
                {/*-------------*/}

                {/*Вернуть после появления курсов*/}
                {/*{(exercisesBought.length > 0 && emailSubscription) && <div className={styles.empty_card_mobile_wrapper}>*/}
                {/*    <div className={styles.empty_card_mobile}>*/}
                {/*    </div>*/}
                {/*</div>}*/}
                {/*-------------*/}
            </Slider>
        </div>
    )
}
