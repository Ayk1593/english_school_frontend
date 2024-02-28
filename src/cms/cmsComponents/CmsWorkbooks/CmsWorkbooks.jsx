import React, {useEffect, useState} from 'react';
import styles from './CmsWorkbooks.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {CmsCourse} from "../CmsCourses/CmsCourse/CmsCourse";
import Button from "@mui/material/Button";
import CmsNewWorkbook from "./CmsNewWorkbook/CmsNewWorkbook";
import {Snack} from "../../../components/SmallComponents/SmallComponents";
import {CmsWorkbook} from "./CmsWorkbook/CmsWorkbook";
import {fetchGetAllWorkbooks} from "../../../redux/slices/cmsSlices/cmsWorkbooksSlice";


const CmsWorkbooks = () => {
    const dispatch = useDispatch()
    const workbooks = useSelector(state => state.cmsWorkbooks.workbooks)
    const addNewWorkbookSuccess = useSelector(state => state.cmsWorkbooks.addNewWorkbookSuccess)
    const [newWorkbookCreated, setNewWorkbookCreated] = useState(addNewWorkbookSuccess)
    const [workbooksArr, setWorkbooksArr] = useState([])
    const [renderNewWorkbookForm, setRenderNewWorkbookForm] = useState(false)

    useEffect(() => {
            dispatch(fetchGetAllWorkbooks())
        },
        [])

    useEffect(() => {
            setWorkbooksArr(workbooks)
        },
        [workbooks])

    useEffect(() => {
            setNewWorkbookCreated(addNewWorkbookSuccess)
        },
        [addNewWorkbookSuccess])

   const handleNewWorkbook = () => {
       setRenderNewWorkbookForm(!renderNewWorkbookForm)
   }
    return (
        <div className={styles.wrapper}>
            <div className={styles.add_course_btn}>
                {!renderNewWorkbookForm && <Button onClick={handleNewWorkbook} variant="contained" > Добавить рабочую тетрадь</Button> }
                {renderNewWorkbookForm && <Button onClick={handleNewWorkbook} variant="contained" > Отменить создание рабочей тетради</Button>}
            </div>

            {(renderNewWorkbookForm && !newWorkbookCreated) &&  <div className={styles.new_course_container}>
                <CmsNewWorkbook />
            </div> }

            <div className={styles.title}>
                Список рабочих тетрадей
            </div>
            <div className={styles.courses_list}>
                {workbooks && workbooksArr.map(workbook => <CmsWorkbook key={workbook._id} workbook={workbook}/>)
                }
            </div>

         <Snack snackIsOpen={newWorkbookCreated} handleClose={ () => setNewWorkbookCreated(false)}/>
        </div>
    );
};

export default CmsWorkbooks;