import React from 'react'
import {Tooltip} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'
import {Delete} from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {deleteCityCard, getCityCard} from '../../../store/sitiesCardsReducer'

const getDateNow = (date: Date) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let month = months[date.getMonth()]
    let dayOfWeek = days[date.getDay()]

    return `${dayOfWeek} ${date.getDate()} ${month}`
}
const date = getDateNow(new Date())

const useStyles = makeStyles(() =>
    createStyles({
        refreshBtn: {
            paddingRight: '5px'
        },
        deleteBtn: {
            paddingLeft: '5px'
        },
        cityName: {
            lineHeight: '1'
        },
        headerCard: {
            maxHeight: '50px'
        },
    })
)

type CityCardHeaderType = {
    cityId: number
    cityName: string
}

export const CityCardHeader = React.memo((props: CityCardHeaderType) => {
    let {cityId, cityName} = props

    const dispatch = useDispatch()
    const classes = useStyles()

    const deleteCardClick = () => {
        dispatch(deleteCityCard(cityId))
    }
    const refreshCardClick = () => {
        dispatch(getCityCard(cityName, 'UPDATE'))
    }

    return (
        <CardHeader
            className={classes.headerCard}
            action={
                <div>
                    <Tooltip title='Refresh'>
                        <IconButton className={classes.refreshBtn} onClick={refreshCardClick}>
                            <RefreshRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton className={classes.deleteBtn} onClick={deleteCardClick}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </div>
            }
            title={
                <Typography variant='h5' component='h1' className={classes.cityName}>
                    {cityName}
                </Typography>
            }
            subheader={date}
        />
    )
})