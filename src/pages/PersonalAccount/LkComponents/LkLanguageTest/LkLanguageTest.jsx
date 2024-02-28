import React, {useEffect, useRef, useState} from 'react';
import styles from './LkLanguageTest.module.scss'
import Slider from "react-slick";
import {
    LangTestNextArrow,
    LangTestPrevArrow,
} from "../../../../components/SliderArrows/SliderArrows";
import {useTranslation} from "react-i18next";
import {OneWordSelect, TwoWordSelect} from "./LangTestSelects/LangTestSelects";
import {useDispatch} from "react-redux";
import {fetchChangeLangLevel} from "../../../../redux/slices/authSlice";
import {SlickNext, SlickPrev} from "../../../../components/SmallComponents/SmallComponents";


export const LkLanguageTestSlider = ({setLangTestOver, testResult, setTestResult}) => {
    const testSliderRef = useRef()
    const [currentPage, setCurrentPage] = useState(1)
    const [progress, serProgress] = useState(currentPage)
    useEffect(() => {
        const arrayRatingItem = document.querySelectorAll(`.${styles.rating_item}`)
        arrayRatingItem.forEach((element, index) => {
            const newIndex = index + 1
            if (newIndex <= progress) {
                element.style.backgroundColor = '#FFE814';
            } else {
                element.style.backgroundColor = 'white';
            }
        })
    }, [progress])
    useEffect(() => {
        serProgress(currentPage)
    }, [currentPage])

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 830,
                settings: {
                  swipe: true
                }
            }
        ]
    };

    const handleAfterChange = (index) => {
        setCurrentPage(++index);
    };

    const next = () => {
        testSliderRef.current.slickNext();
    }
    const prev = () => {
        testSliderRef.current.slickPrev();
    }
    return (
        <div className={styles.slider_wrapper}>
            <Slider ref={testSliderRef} {...settings} afterChange={handleAfterChange}>
                <LkLanguageTest1/>
                <LkLanguageTest2/>
                <LkLanguageTest3/>
                <LkLanguageTest4/>
                <LkLanguageTest5/>
                <LkLanguageTest6 testResult={testResult}
                                 setTestResult={setTestResult} setLangTestOver={setLangTestOver}/>

            </Slider>
            <div onClick={next} className={styles.btn_next}></div>
            <div onClick={prev} className={styles.btn_prev}></div>
            <div className={styles.count_pages}>{currentPage}</div>
            <div className={styles.rating_wrapper}>
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


export const LkLanguageTest1 = () => {
    return (
        <div className={styles.lang_test_wrapper}>
            <div className={styles.lang_test_container}>
                <div className={styles.test_item}>Hello, my name <OneWordSelect option1={'is'}
                                                                                option2={'are'}
                                                                                option3={'am'}
                                                                                option4={'was'}/>
                    Julia. Nice to meet you!
                </div>

                <div className={styles.test_item}>I live <TwoWordSelect option1={'at'}
                                                                        option2={'on'}
                                                                        option3={'in'}
                                                                        option4={'out'}/>
                    Bangkok. It <TwoWordSelect option1={'are'}
                                               option2={'is'}
                                               option3={'am'}
                                               option4={'was'}/>
                    a beautiful place.
                </div>

                <div className={styles.test_item}> I <OneWordSelect option1={'likes'}
                                                                         option2={'liked'}
                                                                         option3={'___'}
                                                                         option4={'like'}/>
                    to eat pizza and drink cola.
                </div>
                <div className={styles.test_item}> My favorite color <TwoWordSelect option1={'are'}
                                                                                    option2={'am'}
                                                                                    option3={'is'}
                                                                                    option4={'was'}/>
                    blue. What <TwoWordSelect option1={'is'}
                                              option2={'are'}
                                              option3={'am'}
                                              option4={'was'}/>
                    your favorite color?
                </div>
                <div className={styles.test_item}>Today <TwoWordSelect option1={'are'}
                                                                       option2={'am'}
                                                                       option3={'was'}
                                                                       option4={'is'}/>
                    Monday. I have to go <TwoWordSelect option1={'to'}
                                                        option2={'___'}
                                                        option3={'at'}
                                                        option4={'in'}/>
                    work.
                </div>
            </div>
        </div>
    )
}

export const LkLanguageTest2 = () => {
    return (
        <div className={styles.lang_test_wrapper}>
            <div className={styles.lang_test_container}>
                <div className={styles.test_item}>Yesterday, I <TwoWordSelect option1={'watch'}
                                                                              option2={'watched'}
                                                                              option3={'watches'}
                                                                              option4={'watching'}/>
                    a really interesting movie. It <TwoWordSelect option1={'is'}
                                                                  option2={'are'}
                                                                  option3={'were'}
                                                                  option4={'was'}/>
                    about a detective who solved a difficult case.
                </div>

                <div className={styles.test_item}>I enjoy <OneWordSelect option1={'playing'}
                                                                         option2={'play'}
                                                                         option3={'played'}
                                                                         option4={'have play'}/>
                    sports, especially basketball. It's a great way to stay active and have fun.
                </div>

                <div className={styles.test_item}> I <OneWordSelect option1={'studied'}
                                                                    option2={'studying'}
                                                                    option3={'studies'}
                                                                    option4={'study'}/>
                    English because I want to be able to travel to different countries and communicate with people from
                    all over the world.
                </div>
                <div className={styles.test_item}> I <OneWordSelect option1={'have'}
                                                                    option2={'has'}
                                                                    option3={'had'}
                                                                    option4={'have had'}/>
                    a pet dog named Max. He's very friendly and loves to play fetch.
                </div>
                <div className={styles.test_item}>This weekend, I plan <TwoWordSelect option1={'visit'}
                                                                                      option2={'to visit'}
                                                                                      option3={'have visited'}
                                                                                      option4={'visited'}/>
                    my grandparents. They <TwoWordSelect option1={'live'}
                                                         option2={'lives'}
                                                         option3={'lived'}
                                                         option4={'have lived'}/>
                    in the countryside and have a big garden.
                </div>
            </div>
        </div>
    )
}

export const LkLanguageTest3 = () => {
    return (
        <div className={styles.lang_test_wrapper}>
            <div className={styles.lang_test_container}>
                <div className={styles.test_item}><OneWordSelect option1={'At'}
                                                                 option2={'On'}
                                                                 option3={'Out'}
                                                                 option4={'In'}/>
                    my free time, I like to read books. My favorite author is Stephen King.
                </div>
                <div className={styles.test_item}>I'm currently <OneWordSelect option1={'studying'}
                                                                               option2={'studied'}
                                                                               option3={'studies'}
                                                                               option4={'have studied '}/>
                    at university and my major is computer science. It's a very interesting field.
                </div>
                <div className={styles.test_item}> I enjoy <TwoWordSelect option1={'travel'}
                                                                          option2={'traveled'}
                                                                          option3={'travels'}
                                                                          option4={'traveling'}/>
                    and experiencing new cultures. Last year, I went to Japan and it was <TwoWordSelect option1={'an'}
                                                                                                        option2={'a'}
                                                                                                        option3={'___'}
                                                                                                        option4={'the'}/>
                    amazing experience.
                </div>
                <div className={styles.test_item}> I think it's <OneWordSelect option1={'dangerous'}
                                                                               option2={'important'}
                                                                               option3={'beautiful'}
                                                                               option4={'useless'}/>
                    to take care of the environment. We should all do our part to reduce pollution and waste.
                </div>
                <div className={styles.test_item}>I'm trying <OneWordSelect option1={'to improve'}
                                                                            option2={'to disapprove'}
                                                                            option3={'disagree'}
                                                                            option4={'improve'}/>
                    my cooking skills, so I've been watching cooking shows and trying out new recipes.
                </div>
            </div>
        </div>
    )
}

export const LkLanguageTest4 = () => {
    return (
        <div className={styles.lang_test_wrapper}>
            <div className={styles.lang_test_container}>
                <div className={styles.test_item}>As <TwoWordSelect option1={'a'}
                                                                    option2={'an'}
                                                                    option3={'___'}
                                                                    option4={'the'}/>
                    result of the pandemic, remote work has become more common and many companies are
                    now allowing their employees to work <TwoWordSelect option1={'from'}
                                                                        option2={'in'}
                                                                        option3={'on the'}
                                                                        option4={'out of'}/> home.
                </div>
                <div className={styles.test_item}>I believe that education is the key to success.
                    That's why I'm always <OneWordSelect option1={'tried'}
                                                         option2={'trying'}
                                                         option3={'tries'}
                                                         option4={'have tried'}/>
                    to learn new things and expand my knowledge.
                </div>
                <div className={styles.test_item}>It's important to have a balanced diet and
                    exercise regularly in order <OneWordSelect option1={'for'}
                                                               option2={'in'}
                                                               option3={'on'}
                                                               option4={'to'}/>
                    maintain good health and well-being.
                </div>
                <div className={styles.test_item}> Climate change is a pressing issue that <OneWordSelect
                                                                                            option1={'requires'}
                                                                                            option2={'require'}
                                                                                            option3={'required'}
                                                                                            option4={'have required'}/>
                    immediate action from governments and individuals alike.
                </div>
                <div className={styles.test_item}>I'm passionate about music and <TwoWordSelect option1={'playing'}
                                                                                                option2={'play'}
                                                                                                option3={'played'}
                                                                                                option4={'have play'}/>
                    the guitar in a band with my friends. We often perform at local <TwoWordSelect option1={'a'}
                                                                                                   option2={'an'}
                                                                                                   option3={'___'}
                                                                                                   option4={'the'}/>
                    venues and events.
                </div>
            </div>
        </div>
    )
}

export const LkLanguageTest5 = () => {
    return (
        <div className={styles.lang_test_wrapper}>
            <div className={styles.lang_test_container}>
                <div className={styles.test_item}><OneWordSelect option1={'In'}
                                                                 option2={'At'}
                                                                 option3={'On'}
                                                                 option4={'With'}/>
                    my opinion, critical thinking and problem-solving skills are essential for success in today's
                    rapidly changing world.
                </div>
                <div className={styles.test_item}>The <TwoWordSelect option1={'rise'}
                                                                     option2={'decrease'}
                                                                     option3={'fall'}
                                                                     option4={'absence'}/>
                    of social media <TwoWordSelect option1={'has'}
                                                   option2={'hav'}
                                                   option3={'has had'}
                                                   option4={'had had'}/>
                    a profound impact on society, including how people interact with each other and consume information.
                </div>
                <div className={styles.test_item}> I'm interested <TwoWordSelect option1={'on'}
                                                                                 option2={'in'}
                                                                                 option3={'at'}
                                                                                 option4={'with'}/>
                    the field of artificial intelligence and the potential it <TwoWordSelect option1={'has'}
                                                                                             option2={'has had'}
                                                                                             option3={'had'}
                                                                                             option4={'have'}/>
                    to revolutionize many industries, such as healthcare and transportation.
                </div>
                <div className={styles.test_item}> The concept of cultural appropriation
                    has become increasingly controversial <TwoWordSelect option1={'on'}
                                                                         option2={'at'}
                                                                         option3={'with'}
                                                                         option4={'in'}/>
                    recent years, with some arguing <TwoWordSelect option1={'those'}
                                                                   option2={'that'}
                                                                   option3={'their'}
                                                                   option4={'these'}/>
                    it perpetuates harmful stereotypes and undermines marginalized groups.
                </div>
                <div className={styles.test_item}>In order to address the growing issue of income <TwoWordSelect
                    option1={'inequality'}
                    option2={'equality'}
                    option3={'effort'}
                    option4={'negotiations'}/>,
                    we need to <TwoWordSelect option1={'reduce'}
                                              option2={'consider'}
                                              option3={'forget'}
                                              option4={'remember'}/>
                    implementing policies such as a living wage and progressive taxation.
                </div>
            </div>
        </div>
    )
}

export const LkLanguageTest6 = ({testResult, setTestResult, setLangTestOver}) => {
    const dispatch = useDispatch()
    const selectInputs1 = document.querySelectorAll('#one_word_select')
    const selectInputs2 = document.querySelectorAll('#two_word_select')
    const [emptySelects, setEmptySelects] = useState(false)

    useEffect(() => {
        const selectInputs1 = document.querySelectorAll('#one_word_select')
        const selectInputs2 = document.querySelectorAll('#two_word_select')
        selectInputs1.forEach(select => {
            select.addEventListener('change', handleSelectChange);
        });
        selectInputs2.forEach(select => {
            select.addEventListener('change', handleSelectChange);
        });

        return () => {
            selectInputs1.forEach(select => {
                select.removeEventListener('change', handleSelectChange);
            });
            selectInputs2.forEach(select => {
                select.removeEventListener('change', handleSelectChange);
            });
        };
    }, [])
    const handleSelectChange = (event) => {
        const selectElement = event.target;
        if (selectElement.value !== '') {
            selectElement.style.border = 'none';
        }

    }

    const rightAnswers1 = ['is', 'like', 'playing', 'study', 'have', 'In', 'studying', 'important', 'to improve', 'trying', 'to',
        'requires', 'In', 'crucial', 'equality', 'valuable']
    const rightAnswers2 = ['in is', 'is is', 'is to', 'watched was', 'to visit live', 'traveling an', 'a from', 'play ___',
        'rise has had', 'in has', 'in that', 'inequality consider', 'a society mitigate', 'as disrupt']

    const getResult = (selectsEmpty) => {
        if (!selectsEmpty) {
            let newArr = [];
            let iterations = rightAnswers2.length

            for (let i = 0; i < selectInputs2.length; i = i + 2) {
                newArr.push(selectInputs2[i].value + ' ' + selectInputs2[i + 1].value)
            }

            let i = 0
            for (let input of selectInputs1) {
                if (input.value === rightAnswers1[i]) {
                    setTestResult(++testResult)
                }
                i++
            }
            let s = 0
            for (let input of newArr) {
                if (input === rightAnswers2[s]) {
                    setTestResult(++testResult)
                }

                if (--iterations <= 0) {
                    let langTestResult = 0
                    if (testResult < 6) {
                        langTestResult = 'A1'
                    } else if (testResult >= 6 && testResult <= 10) {
                        langTestResult = 'A2'
                    } else if (testResult >= 11 && testResult <= 15) {
                        langTestResult = 'B1'
                    } else if (testResult >= 16 && testResult <= 20) {
                        langTestResult = 'B2'
                    } else if (testResult >= 21 && testResult <= 25) {
                        langTestResult = 'C1'
                    } else if (testResult >= 26 && testResult <= 30) {
                        langTestResult = 'C2'
                    }
                    const langLevelObj = {
                        'lang_level': langTestResult
                    }
                    dispatch(fetchChangeLangLevel(langLevelObj))
                }
                s++

            }
            setLangTestOver(true)
        }
    }
    const result = (funcGetResult) => {
        let selectsEmpty = false
        for (let input of selectInputs1) {
            if (input.value === '') {
                input.style.border = '1px solid red'
                setEmptySelects(true)
                selectsEmpty = true
            }
            else {
                input.style.border = 'none'
            }
        }

        for (let input of selectInputs2) {
            if (input.value === '') {
                input.style.border = '1px solid red'
                setEmptySelects(true)
                selectsEmpty = true
            }
            else {
                input.style.border = 'none'
            }
        }
        funcGetResult(selectsEmpty)
    }

    return (
        <div className={styles.lang_test_wrapper}>
            <div className={styles.lang_test_container}>
                <div className={styles.test_item}>As <TwoWordSelect option1={'a society'}
                                                                    option2={'social'}
                                                                    option3={'socialise'}
                                                                    option4={'the unemployed'}/>,
                    we need to prioritize sustainability and take action to <TwoWordSelect option1={'improve'}
                                                                                           option2={'mitigate'}
                                                                                           option3={'ignore'}
                                                                                           option4={'disagree with'}/>
                    the impact of climate change before it's too late.
                </div>
                <div className={styles.test_item}>The concept of intersectionality is <OneWordSelect option1={'useless'}
                                                                                                     option2={'superior'}
                                                                                                     option3={'finished'}
                                                                                                     option4={'crucial'}/>
                    to understanding the complex ways in which different forms of oppression and privilege intersect and
                    affect individuals and communities.
                </div>
                <div className={styles.test_item}>In order to promote <OneWordSelect option1={'inequality'}
                                                                                     option2={'equality'}
                                                                                     option3={'effort'}
                                                                                     option4={'negotiations '}/>
                    and social justice, it's important to recognize and address systemic issues such as racism, sexism,
                    and ableism.
                </div>
                <div className={styles.test_item}> The advent of technologies such <TwoWordSelect option1={'as'}
                                                                                                  option2={'on'}
                                                                                                  option3={'with'}
                                                                                                  option4={'at'}/>
                    blockchain and cryptocurrency has the potential to <TwoWordSelect option1={'disagree'}
                                                                                      option2={'disregard'}
                                                                                      option3={'interrupt'}
                                                                                      option4={'disrupt'}/>
                    traditional industries and change the way we conduct transactions and exchange value.
                </div>
                <div className={styles.test_item}>The study of philosophy is <OneWordSelect option1={'valuable'}
                                                                                            option2={'useless'}
                                                                                            option3={'superior'}
                                                                                            option4={'finished'}/>
                    not only for its intellectual stimulation, but also for its practical applications in fields such as
                    ethics and decision-making.
                </div>
                <div className={styles.btn_test_result_wrapper}>
                    <button onClick={() => result(getResult)} className={styles.btn_test_result}>Узнать результат</button>
                </div>
            </div>
            <div className={styles.selects_error}> {emptySelects &&
                <div>Необходимо заполнить все поля</div>}</div>
        </div>
    )
}


export const LkLanguageTestResult = ({testResult, setActive, setLangTestOver}) => {
    const {t} = useTranslation();
    const followLk = () => {
        setActive(false)
        setLangTestOver(false)
    }
    return (
        <div className={styles.test_result_wrapper}>
            <div className={styles.test_result_container}>
                <div className={styles.your_result}>{t("language_test.your_result")}</div>
                <div className={styles.result}>
                    {(testResult < 6) && <div className={styles.a1}>A1</div>}
                    {(testResult >= 6 && testResult <= 10) && <div className={styles.a2}>A2</div>}
                    {(testResult >= 11 && testResult <= 15) && <div className={styles.b1}>B1</div>}
                    {(testResult >= 16 && testResult <= 20) && <div className={styles.b2}>B2</div>}
                    {(testResult >= 21 && testResult <= 25) && <div className={styles.c1}>C1</div>}
                    {(testResult >= 26 && testResult <= 30) && <div className={styles.c2}>C2</div>}
                </div>
                <div className={styles.materials}>{t("language_test.materials")}</div>
                <button onClick={followLk} className={styles.btn_follow}>{t("language_test.btn_follow")}</button>
            </div>
        </div>
    );
};

