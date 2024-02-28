import React from 'react';
import styles from './SliderButtons.module.scss'
import prev_icon from "../../img/courses/prev_icon.png";
import next_icon from "../../img/courses/next_icon.png";

const SliderButtons = ({prevSlide, nextSlide}) => {
    return (
            <div className={styles.slider__buttons}>
                <div onClick={prevSlide} className={styles.prev__button}>
                    <img src={prev_icon} />
                </div>
                <div  onClick={nextSlide} className={styles.next__button}>
                    <img src={next_icon} />
                </div>
            </div>
    );
};

export default SliderButtons;