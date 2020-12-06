import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {setError} from '../../store/appReducer'

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const ErrorSnackbar = () => {
    const error = useSelector<AppStateType, null | string>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setError(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>

    )
}
