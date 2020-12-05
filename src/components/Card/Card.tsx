import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {Delete} from '@material-ui/icons'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'
import {deleteCityCard, updateCity} from '../../store/sitiesCardsReducer'
import {useDispatch} from 'react-redux'
import {Tooltip} from '@material-ui/core'

type InfoTempType = {
    'temp': number
    'feels_like': number
    'temp_min': number
    'temp_max': number
    'pressure': number
    'humidity': number
}

type CardPropsType = {
    cityId: number
    cityName: string
    infoTemp: InfoTempType
    wind: {
        'speed': number
        'deg': number
    }
    icon: string
}

function getDateNow(date: Date) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let month = months[date.getMonth()]
    let dayOfWeek = days[date.getDay()]

    return `${dayOfWeek} ${date.getDate()} ${month}`
}

const date = getDateNow(new Date())

const roundingTemp = (infoTemp: InfoTempType): InfoTempType => {
    for (let objKey in infoTemp) {
        // @ts-ignore
        infoTemp[objKey] = Math.round(infoTemp[objKey])

    }
    return infoTemp
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: 200,
            background: 'rgba(91, 180, 255, 0.3)',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
            width: '30%'
        },
        tempNow: {
            textAlign: 'center'
        },
        refreshBtn: {
            paddingRight: '5px'
        },
        deleteBtn: {
            paddingLeft: '5px'
        }
    }),
)

export function CityCard(props: CardPropsType) {
    let {cityId, cityName, infoTemp, wind, icon} = props
    infoTemp = roundingTemp(infoTemp)

    const dispatch = useDispatch()
    const classes = useStyles()

    const deleteCardClick = () => {
        dispatch(deleteCityCard(cityId))
    }
    const refreshCardClick = () => {
        dispatch(updateCity(cityId))
    }

    return (
        <Card className={classes.root}>
            <CardHeader
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
                    <Typography variant='h5' component='h1'>
                        {cityName}
                    </Typography>}
                subheader={date}
            />
            <CardContent>
                <Typography variant='h5' component='h1' className={classes.tempNow}>
                    {infoTemp.temp} ℃
                </Typography>
                <img style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }} src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='weatherImage'/>
                <Typography variant="body2" color="textSecondary" component="p">
                    Feels like: {infoTemp.feels_like} ℃
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    High: {infoTemp.temp_max} ℃
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Low: {infoTemp.temp_min} ℃
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Wind: {wind.speed} m/s
                </Typography>
            </CardContent>
        </Card>
    )
}