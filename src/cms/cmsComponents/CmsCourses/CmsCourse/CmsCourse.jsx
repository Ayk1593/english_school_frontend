import React, {useState} from 'react';
import styles from './CmsCourse.module.scss'
import {useForm, Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";
import {fetchModifyCourse} from "../../../../redux/slices/cmsSlices/cmsCoursesSlice";
import {useDispatch} from "react-redux";

export const CmsCourse = ({course}) => {
    const dispatch = useDispatch()
    const [disabledInput, setDisabledInput] = useState(true)
    const {
        control, register, handleSubmit, formState: {
            errors
        }
    } = useForm({
        defaultValues: {
            "name": `${course.name}`,
            "description": `${course.description}`,
            "level": `${course.level}`,
            "content": `${course.content}`,
            "technique": `${course.technique}`,
            "number_of_lessons": `${course.number_of_lessons}`,
            "gift": `${course.gift}`,
            "price_rub": `${course.price_rub}`
        }
    });
    const onSubmit = (formData) => {
        const data = {
            formData: {...formData},
            courseId: course._id
        }
        dispatch(fetchModifyCourse(data))
        console.log(data);
        setDisabledInput(true)
    }
    return (
        <div className={styles.course_wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.course_title}>{course.name}</div>

                <div className={styles.course_item}><span>Название курса:</span>
                    <div className={styles.input_container}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.name?.message}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Описание курса:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="description"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    multiline
                                    minRows={4}
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.description?.message}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Уровень:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="level"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.level?.message}
                                    helperText={errors.level?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Количество тем/уроков:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="content"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    multiline
                                    minRows={2}
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.content?.message}
                                    helperText={errors.content?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Методика:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="technique"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    multiline
                                    minRows={2}
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.technique?.message}
                                    helperText={errors.technique?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Количество уроков:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="number_of_lessons"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.number_of_lessons?.message}
                                    helperText={errors.number_of_lessons?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Подарок:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="gift"
                            render={({field}) => (
                                <Checkbox
                                    disabled={disabledInput}
                                    checked={field.value}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.gift?.message}
                                    helperText={errors.gift?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles.course_item}>Цена:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="price_rub"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    disabled={disabledInput}
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.price_rub?.message}
                                    helperText={errors.price_rub?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                {disabledInput && <Button onClick={() => setDisabledInput(false)} style={{marginTop: '20px'}}
                                          variant="outlined">Редактировать</Button> }
                {!disabledInput && <Button type='submit'
                                           style={{marginTop: '20px'}} variant="outlined">Сохранить</Button>}
            </form>

        </div>
    );
};

