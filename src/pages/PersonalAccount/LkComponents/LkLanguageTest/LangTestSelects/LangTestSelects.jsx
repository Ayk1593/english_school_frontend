import React from 'react';
import styles from './LangTestSelects.module.scss'

export const OneWordSelect = ({option1, option2, option3, option4}) => {
    return (
        <span className={styles.select_wrapper}>
            <select id="one_word_select"
                    className={styles.lang_test_select}>
                <option className={styles.test_select} value='' disabled selected></option>
                <option className={styles.test_select} value={option1}>{option1}</option>
                <option className={styles.test_select} value={option2}>{option2}</option>
                <option className={styles.test_select} value={option3}>{option3}</option>
                <option className={styles.test_select} value={option4}>{option4}</option>
            </select>
            </span>
    );
};

export const TwoWordSelect = ({option1, option2, option3, option4}) => {
    return (
        <span className={styles.select_wrapper}>
        <select id="two_word_select"
                className={styles.lang_test_select}>
            <option className={styles.test_select} value='' disabled selected></option>
            <option className={styles.test_select} value={option1}>{option1}</option>
            <option className={styles.test_select} value={option2}>{option2}</option>
            <option className={styles.test_select} value={option3}>{option3}</option>
            <option className={styles.test_select} value={option4}>{option4}</option>
        </select>
        </span>
    );
};


