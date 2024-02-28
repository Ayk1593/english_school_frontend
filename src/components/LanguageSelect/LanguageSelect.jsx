import React, {useEffect, useRef, useState} from 'react';
import styles from './LanguageSelect.module.scss'
import {Flag} from "../SmallComponents/SmallComponents";

const LanguageSelect = () => {
    const [selectOpen, setSelectOpen] = useState(false)
    const [langSelected, setLangSelected] = useState('')
    const enRef = useRef(null);
    const ruRef = useRef(null);
    const targetRef = useRef(null);
    useEffect(() => {
            setLangSelected('ru')
        },
        [])

    const chooseLanguage= (lang) => {
        let selectRef = ''
        const selectRefFunc = () => {
            if (lang === 'en') {
                selectRef = enRef
            } else if (lang === 'ru') {
                selectRef = ruRef
            }
        }
        selectRefFunc()
        const selectedFlag = selectRef.current.innerHTML;
        targetRef.current.innerHTML = selectedFlag;
        selectRef.current.parentNode.removeChild(selectRef.current)
        setSelectOpen(!selectOpen)
        setLangSelected(lang)
    }

    return (
        <div className={styles.select_wrapper}>
            <div onClick={() => setSelectOpen(!selectOpen)} className={styles.selected} ref={targetRef}>
                <Flag lang={'ru'}/>
            </div>

            {selectOpen && <div className={styles.lang_select}>
                {(langSelected !== 'en' || langSelected === '') && <div className={styles.select_item}
                                                                        onClick={() => chooseLanguage('en')} ref={enRef}>
                    <Flag lang={'en'}/>
                </div>}
                {(langSelected !== 'ru' || langSelected === '') && <div className={styles.select_item}
                                                                        onClick={() => chooseLanguage('ru')} ref={ruRef}>
                    <Flag lang={'ru'}/>
                </div>}
                <div className={styles.select_item} onClick={() => chooseLanguage('en')}>

                </div>
            </div>}
        </div>
    );
};

export default LanguageSelect;