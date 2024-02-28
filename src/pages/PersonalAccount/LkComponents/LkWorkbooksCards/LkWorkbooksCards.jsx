import React, {useEffect, useRef, useState} from 'react';
import styles from './LkWorkbooksCards.module.scss'
import {useTranslation} from "react-i18next";
import workbook_img from "../../../../img/workbooks/workbook_img.png";
import workbook_img_mobile from "../../../../img/workbooks/workbook_img_mobile.png";
import books_icon from "../../../../img/workbooks/books_icon.png";
import clock_icon from "../../../../img/workbooks/clock_icon.png";
import check_icon from "../../../../img/workbooks/check_icon.png";
import {SampleNextArrow, SamplePrevArrow} from "../../../../components/SliderArrows/SliderArrows";
import Slider from "react-slick";
import classNames from "classnames";
import {SlickNext, SlickPrev} from "../../../../components/SmallComponents/SmallComponents";


export const LkWorkbookCard = ({marginLeft, setModalByeWorkbook}) => {
    const {t} = useTranslation();
    const [rating, setRating] = useState(0);
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
        <div className={styles.workbook__card__wrapper}>
            <div  style={{marginLeft: `${marginLeft}`}} className={styles.workbook__card}>
                <div className={styles.workbook__title}>
                    {t("workbooks.workbooks_card_title")}
                </div>

                <img className={styles.workbook__img} src={workbook_img}/>
                <img className={styles.workbook__img__mobile} src={workbook_img_mobile}/>

                <div className={styles.about__icons}>
                    <div className={styles.about__icon}>
                        <img src={books_icon}/>
                        <div>{t("workbooks.level")}</div>
                    </div>
                    <div className={styles.about__icon}>
                        <img src={clock_icon}/>
                        <div>{t("workbooks.about_times")}</div>
                    </div>
                    <div className={styles.about__icon}>
                        <img src={check_icon}/>
                        <div>{t("workbooks.exercises")}</div>
                    </div>
                </div>
                {<div className={styles.btn_bye_workbook_wrapper}>
                   <button onClick={() => setModalByeWorkbook(true)} className={styles.btn_bye_workbook}>{t("lk_workbook.bye")}</button>
                </div>}

                {/*{<div className={styles.btn_bye_workbook_wrapper}>*/}
                {/*    <button className={styles.btn_bye_workbook}>{t("lk_workbook.download")}</button>*/}
                {/*</div>}*/}

                {/*<span className={styles.your_progress}>{t("lk_courses.your_progress")}</span>*/}
                {/*<div className={styles.rating_wrapper}>*/}
                {/*    <div className={styles.rating_item}></div>*/}
                {/*    <div className={styles.rating_item}></div>*/}
                {/*    <div className={styles.rating_item}></div>*/}
                {/*    <div className={styles.rating_item}></div>*/}
                {/*    <div className={styles.rating_item}></div>*/}
                {/*    <div className={styles.rating_item}></div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
};

export const LkWorkbookCardsSlider = ({workbooksBought, setModalByeWorkbook}) => {
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
        <div className={classNames({[styles.slider_wrapper]: workbooksBought})}>
            <Slider ref={sliderRef} {...settings}>

                <LkWorkbookCard marginLeft={'0px'} setModalByeWorkbook={setModalByeWorkbook}/>
                {/*{ workbooksBought && <LkWorkbookCard /> }*/}
                {(countSlide < 3) && <div className={styles.empty_second_plug}></div> }
                {/*{ workbooksBought && <LkWorkbookCard /> }*/}
                {/*{ workbooksBought && <LkWorkbookCard /> }*/}
            </Slider>
        </div>
    )
}


export const LkWorkbookCardsMobileSlider = ({workbooksBought, setModalByeWorkbook}) => {
    console.log(workbooksBought)
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
                <LkWorkbookCard  setModalByeWorkbook={setModalByeWorkbook}/>
                {/*{workbooksBought && <LkWorkbookCard /> }*/}

                {/*{(!workbooksBought ) && <div className={styles.empty_card_mobile_wrapper}>*/}
                {/*    <div className={styles.empty_card_mobile}>*/}
                {/*    </div>*/}
                {/*</div>}*/}
            </Slider>
        </div>
    )
}