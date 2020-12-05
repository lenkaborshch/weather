import {useFormik} from 'formik'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addCity} from '../../store/sitiesCardsReducer'
import {AppStateType} from '../../store/store'
import style from './CitySearchForm.module.css'
import {Button, Input} from '@material-ui/core'

export const CitySearchForm = React.memo(() => {
    const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            cityName: '',
        },
        onSubmit: (values) => {
            dispatch(addCity(values.cityName))
            formik.resetForm()
        },
    })
    return (
        <form onSubmit={formik.handleSubmit} className={style.formSearch}>
            <Input placeholder='City' {...formik.getFieldProps('cityName')}
                   onChange={formik.handleChange} value={formik.values.cityName}
            className={style.inputFormSearch}/>
            <Button type='submit' disabled={isLoading || !formik.values.cityName}
                    variant='contained' color='primary'>Add</Button>
        </form>
    )
})