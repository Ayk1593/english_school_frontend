import React from 'react';
import styles from './SliderArrows.module.scss'
import classNames from "classnames";


  export const SampleNextArrow = (props) => {
    const {className, style, onClick, display, marginTop, marginRight, left} = props;
    return (
        <div
            className={classNames(className, styles.slick__next)}
            style={{...style, display: `${display}`, background: "#E0ADFF", borderRadius: "50%",
                marginTop: `${marginTop}`, marginRight: `${marginRight}`,  left: `${left}` }}
            onClick={onClick}
        />
    );
}

 export const SamplePrevArrow = (props) => {
     const {className, style, onClick, display, marginTop, marginLeft} = props;
     return (
         <div
             className={classNames(className, styles.slick__prev)}
             style={{...style, display: `${display}`, background: "#E0ADFF", borderRadius: "50%",
                 marginTop: `${marginTop}`, marginLeft: `${marginLeft}` }}
             onClick={onClick}
         />
     );
 }

export const LangTestNextArrow = (props) => {
    const {className, style, onClick, display, marginTop, marginRight} = props;
    return (
        <div
            className={classNames(className, styles.test__slick__next)}
            style={{...style, display: `${display}`, background: "#E0ADFF", borderRadius: "50%",
                marginTop: `${marginTop}`, marginRight: `${marginRight}` }}
            onClick={onClick}
        />
    );
}

export const LangTestPrevArrow = (props) => {
    const {className, style, onClick, display, marginTop, marginLeft} = props;
    return (
        <div
            className={classNames(className, styles.test__slick__prev)}
            style={{...style, display: `${display}`, background: "#E0ADFF", borderRadius: "50%",
                marginTop: `${marginTop}`, marginLeft: `${marginLeft}` }}
            onClick={onClick}
        />
    );
}