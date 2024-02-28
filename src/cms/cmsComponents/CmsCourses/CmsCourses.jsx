import React, {useEffect, useState} from 'react';
import styles from './CmsCourses.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {CmsCourse} from "./CmsCourse/CmsCourse";
import Button from "@mui/material/Button";
import CmsNewCourse from "./CmsNewCourse/CmsNewCourse";
import {Snack} from "../../../components/SmallComponents/SmallComponents";
import {fetchGetAllCourses} from "../../../redux/slices/cmsSlices/cmsCoursesSlice";


const CmsCourses = () => {
    const dispatch = useDispatch()
    const courses = useSelector(state => state.cmsCourses.courses)
    const addNewCourseSuccess = useSelector(state => state.cmsCourses.addNewCourseSuccess)
    const [newCourseCreated, setNewCourseCreated] = useState(addNewCourseSuccess)
    const [coursesArr, setCoursesArr] = useState([])
    const [renderNewCourseForm, setRenderNewCourseForm] = useState(false)
    useEffect(() => {
            dispatch(fetchGetAllCourses())
        },
        [])

    useEffect(() => {
            setCoursesArr(courses)
        },
        [courses])
    useEffect(() => {
            setNewCourseCreated(addNewCourseSuccess)
        },
        [addNewCourseSuccess])
    const handleNewCourse = () => {
        setRenderNewCourseForm(!renderNewCourseForm)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.add_course_btn}>
                {!renderNewCourseForm && <Button onClick={handleNewCourse} variant="contained"> Добавить курс</Button>}
                {renderNewCourseForm &&
                    <Button onClick={handleNewCourse} variant="contained"> Отменить создание курса</Button>}
            </div>

            {(renderNewCourseForm && !newCourseCreated) && <div className={styles.new_course_container}>
                <CmsNewCourse/>
            </div>}

            <div className={styles.title}>
                Список курсов
            </div>
            <div className={styles.courses_list}>
                {courses && coursesArr.map(course => <CmsCourse key={course._id} course={course}/>)
                }
            </div>

            <Snack snackIsOpen={newCourseCreated} handleClose={() => setNewCourseCreated(false)}/>
        </div>
    );
};

export default CmsCourses;