import React, {useEffect, useRef, useState} from 'react';
import styles from './LkCoursesCards.module.scss'
import yulia_icon from "../../../../img/lk/courses/yulia_photo.png";
import books_icon from "../../../../img/courses/books_icon.png";
import clock_icon from "../../../../img/courses/clock_icon.png";
import hands_icon from "../../../../img/courses/hands_icon.png";
import {useTranslation} from "react-i18next";
import Slider from "react-slick";
import {SampleNextArrow, SamplePrevArrow} from "../../../../components/SliderArrows/SliderArrows";
import classNames from "classnames";
import {SlickNext, SlickPrev} from "../../../../components/SmallComponents/SmallComponents";
import {LkSubscribeCard} from "../LkExercisesCards/LkExercisesCards";
import {YouAreSubscribed} from "../LkSmallComponents/LkSmallComponents";

export const LkTouristosCard = () => {
    const {t} = useTranslation();
    const [rating, setRating] = useState(0)
    useEffect(() => {
        const arrayRatingItem = document.querySelectorAll(`.${styles.rating_item}`)
        arrayRatingItem.forEach((element, index) => {
            const newIndex = index + 1
            if (newIndex <= rating) {
                element.style.backgroundColor = '#FFE814';
            }
        })
    }, [rating])
    setTimeout(() => setRating(2), 1000)
    return (
        <div className={styles.touristos__card__wrapper}>
            <div className={styles.beginner__card}>
                <div className={styles.yulia__icon}>
                    <img src={yulia_icon}/>
                    <div className={styles.title__card__mobile}>{t("courses.touristos_title_card")}</div>
                </div>
                <div className={styles.info__card}>
                    <div className={styles.title__card}>{t("courses.touristos_title_card")}</div>
                    <p className={styles.card__about}>{t("courses.card_about")}</p>
                    <div className={styles.about__icons}>
                        <div className={styles.about__icon}>
                            <img src={books_icon}/>
                            <div>{t("courses.level")}</div>
                        </div>
                        <div className={styles.about__icon}>
                            <img src={clock_icon}/>
                            <div>{t("courses.5themes")}</div>
                        </div>
                        <div className={styles.about__icon}>
                            <img src={hands_icon}/>
                            <div>{t("courses.communicative_method")}</div>
                        </div>

                    </div>
                    <span className={styles.your_progress}>{t("lk_courses.your_progress")}</span>

                </div>
            </div>
            <div className={styles.rating_wrapper}>
                <div className={styles.rating_item}></div>
                <div className={styles.rating_item}></div>
                <div className={styles.rating_item}></div>
                <div className={styles.rating_item}></div>
                <div className={styles.rating_item}></div>
                <div className={styles.rating_item}></div>
                <div className={styles.rating_item}></div>
            </div>
        </div>
    );
};

export const LkCoursesCardsSlider = ({coursesArray, emailSubscription, setEmailSubsSuccess}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'-33px'} left={'125px'}/>,
        prevArrow: <SlickPrev bottom={'-33px'} left={'70px'}/>,
    };
    return (
        <div className={classNames({[styles.slider_wrapper]: (coursesArray.length > 0)})}>
            <Slider {...settings}>
                {/*{(coursesArray.length > 0) && <LkTouristosCard/>}*/}
                {/*{(coursesArray.length > 0) && <LkTouristosCard/>}*/}
            </Slider>
        </div>
    )
}

export const LkCoursesCardsMobileSlider = ({coursesArray, emailSubscription, setEmailSubsSuccess}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNext bottom={'34px'} left={'190px'}/>,
        prevArrow: <SlickPrev bottom={'34px'} left={'88px'}/>,
    };
    return (
        <div className={styles.mobile_slider_wrapper}>
            <Slider {...settings}>
                {/*Вернуть после появления курсов*/}
                {/*{(coursesArray.length > 0) && <LkTouristosCard/>}*/}
                {/*{(coursesArray.length < 1) && <div className={styles.empty_card_mobile_wrapper}>*/}
                {/*    <div className={styles.empty_card_mobile}>*/}
                {/*    </div>*/}
                {/*</div>}*/}
                {/*----------------*/}

                {/*Удалить после появления курсов*/}
                {!emailSubscription && <LkSubscribeCard setEmailSubsSuccess={setEmailSubsSuccess}/>}
                {emailSubscription && <YouAreSubscribed />}
                {/*-------------*/}
            </Slider>
        </div>
    )
}


// export const LkTouristosCardMobile = () => {
//     const {t} = useTranslation();
//     return (
//         <div className={styles.touristos_card_mobile_wrapper}>
//             <div className={styles.touristos_card_mobile}>
//                 <div className={styles.yulia__icon}>
//                     <img src={yulia_icon}/>
//                     <span className={styles.title__card__mobile}>{t("courses.touristos_title_card")}</span>
//                 </div>
//                 <p className={styles.card__about}>{t("courses.card_about")}</p>
//                 <span className={styles.your_progress}>{t("lk_courses.your_progress")}</span>
//
//                 <div className={styles.rating_wrapper}>
//                     <div className={styles.rating_item}></div>
//                     <div className={styles.rating_item}></div>
//                     <div className={styles.rating_item}></div>
//                     <div className={styles.rating_item}></div>
//                     <div className={styles.rating_item}></div>
//                     <div className={styles.rating_item}></div>
//                     <div className={styles.rating_item}></div>
//                 </div>
//             </div>
//         </div>
//
//     )
// }

