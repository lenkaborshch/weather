import {useFormik} from 'formik'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCityCard} from '../../../store/citiesCardsReducer'
import {AppStateType} from '../../../store/store'
import {Button, Input} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
    createStyles({
        formSearch: {
            padding: '30px',
            textAlign: 'center',
        },
        inputFormSearch: {
            margin: '5px'
        }
    })
)

export const CitySearchForm = React.memo(() => {
    const classes = useStyles()
    const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            cityName: '',
        },
        onSubmit: (values) => {
            dispatch(getCityCard(values.cityName, 'ADD'))
            formik.resetForm()
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className={classes.formSearch}>
            <Input placeholder='City' {...formik.getFieldProps('cityName')}
                   onChange={formik.handleChange} value={formik.values.cityName}
                   className={classes.inputFormSearch}/>
            <Button type='submit' disabled={isLoading || !formik.values.cityName}
                    variant='contained' color='primary'>Add</Button>
        </form>
    )
})