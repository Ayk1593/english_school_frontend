import React, {useState} from 'react';
import styles from './CmsCWorkbook.module.scss'
import {useForm, Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {fetchModifyWorkbook} from "../../../../redux/slices/cmsSlices/cmsWorkbooksSlice";

export const CmsWorkbook = ({workbook}) => {
    const dispatch = useDispatch()
    const [disabledInput, setDisabledInput] = useState(true)
    const {
        control, register, handleSubmit, formState: {
            errors
        }
    } = useForm({
        defaultValues: {
            "name": `${workbook.name}`,
            "description": `${workbook.description}`,
            "level": `${workbook.level}`,
            "content": `${workbook.content}`,
            "technique": `${workbook.technique}`,
            "gift": `${workbook.gift}`,
            "price_rub": `${workbook.price_rub}`,
            "price_rub_old": `${workbook.price_rub_old}`,
        }
    });
    const onSubmit = (formData) => {
        const data = {
            formData: {...formData},
            workbookId: workbook._id
        }
        dispatch(fetchModifyWorkbook(data))
        console.log(data);
        setDisabledInput(true)
    }
    return (
        <div className={styles.course_wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.course_title}>{workbook.name}</div>

                <div className={styles.course_item}><span>Название рабочей тетради:</span>
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

                <div className={styles.course_item}>Цена без скидки:
                    <div className={styles.input_container} >
                        <Controller
                            control={control}
                            name="price_rub_old"
                            rules={{required: "Поле обязательно к заполнению"}}
                            render={({field}) => (
                                <TextField
                                    disabled={disabledInput}
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
                {disabledInput && <Button onClick={() => setDisabledInput(false)} style={{marginTop: '20px'}}
                                          variant="outlined">Редактировать</Button> }
                {!disabledInput && <Button type='submit'
                                           style={{marginTop: '20px'}} variant="outlined">Сохранить</Button>}
            </form>

        </div>
    );
};

