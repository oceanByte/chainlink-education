import * as React from 'react'
import {FormSevenChapterWrapper} from './FormSevenChapter.style'
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {
    FormInputs,
    getErrorMessage,
    getInputStatus,
    updateFormFromBlur,
    updateFormFromChange, updateFormFromSubmit
} from "../../../helpers/form";
import {SevenChapterForm} from "../../../shared/meme/SevenChapterForm";
import {Input} from "../Input/Input.controller";
import {Button} from "../Button/Button.controller";
export const FormSevenChapterView = () => {

    const [form, setForm] = useState<FormInputs>({
        meme: { value: '' },
        title: { value: '' },
        url: { value: '' },
        category: { value: '' },
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedForm = updateFormFromChange(e, form, SevenChapterForm)
        setForm(updatedForm)
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedForm = updateFormFromBlur(e, form)
        console.log(updatedForm)
        setForm(updatedForm)
    }

    const handleSubmit = (event: SyntheticEvent) => {
        const updatedForm = updateFormFromSubmit(event, form, SevenChapterForm)
        console.log(updatedForm)
        if (!updatedForm.meme.error && !updatedForm.title.error && !updatedForm.url.error && !updatedForm.category.error)
            console.log('success')
        else setForm(updatedForm)
    }

    return (
        <FormSevenChapterWrapper>
            <form onSubmit={handleSubmit}>
                <Input
                    name="meme"
                    placeholder="Enter Meme"
                    type="text"
                    onChange={handleChange}
                    value={form.meme.value}
                    onBlur={handleBlur}
                    inputStatus={getInputStatus(form.meme)}
                    errorMessage={getErrorMessage(form.meme)}
                />
                <Input
                    name="title"
                    placeholder="Enter Title"
                    type="text"
                    onChange={handleChange}
                    value={form.title.value}
                    onBlur={handleBlur}
                    inputStatus={getInputStatus(form.title)}
                    errorMessage={getErrorMessage(form.title)}
                />
                <Input
                    name="url"
                    placeholder="Enter Data"
                    type="text"
                    onChange={handleChange}
                    value={form.url.value}
                    onBlur={handleBlur}
                    inputStatus={getInputStatus(form.url)}
                    errorMessage={getErrorMessage(form.url)}
                />
                <Input
                    name="category"
                    placeholder="Enter Category"
                    type="number"
                    onChange={handleChange}
                    value={form.category.value}
                    onBlur={handleBlur}
                    inputStatus={getInputStatus(form.category)}
                    errorMessage={getErrorMessage(form.category)}
                />
                <Button type="submit" text="Submit" />
            </form>
        </FormSevenChapterWrapper>
    )
}
