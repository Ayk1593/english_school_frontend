import React from 'react';
import styles from './CmsNewWorkbook.module.scss'
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {Checkbox} from "@mui/material";
import Button from "@mui/material/Button";
import {fetchAddNewCourse} from "../../../../redux/slices/cmsSlices/cmsCoursesSlice";
import {useDispatch} from "react-redux";

const CmsNewWorkbook = () => {
    const dispatch = useDispatch()
    const {
        control, register, handleSubmit, formState: {
            errors
        }
    } = useForm();

    const onSubmit = (formData) => {
        // dispatch(fetchAddNewCourse(formData))
        console.log(formData);

    }
    return (
        <div className={styles.course_wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.new_course_title}>Новая рабочая тетрадь</div>
                <div className={styles.course_item}><span>Название рабочей тетради:</span>
                    <div className={styles.input_container}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
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

                <div className={styles.course_item}>Подарок:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="gift"
                            render={({field}) => (
                                <Checkbox
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

                <div className={styles.course_item}>Цена без скидки:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="price_rub_old"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    variant="filled"
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={errors.price_rub_old?.message}
                                    helperText={errors.price_rub_old?.message}
                                />
                            )}
                        />
                    </div>
                </div>
                 <Button type='submit' style={{marginTop: '20px'}}
                                          variant="outlined">Создать рабочую тетрадь</Button>

            </form>

        </div>
    );
};

export default CmsNewWorkbook;