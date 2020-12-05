import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {Tooltip} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {deleteCityCard} from '../../store/sitiesCardsReducer'
import {useDispatch} from 'react-redux'

type CardPropsType = {
    cityId: number
    cityName: string
    generalInfoTemp: {
        'temp': number
        'feels_like': number
        'temp_min': number
        'temp_max': number
        'pressure': number
        'humidity': number
    },
    wind: {
        'speed': number
        'deg': number
    },
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
        }
    }),
)

export function CityCard(props: CardPropsType) {
    let {cityId, cityName, generalInfoTemp, wind, icon} = props
    const dispatch = useDispatch()
    const classes = useStyles()

    const deleteCardClick = () => {
        dispatch(deleteCityCard(cityId))
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={deleteCardClick}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                }
                title={cityName}
                subheader={date}
            />
            <CardContent>
                <Typography variant='h5' component='h1' className={classes.tempNow}>
                    {generalInfoTemp.temp} ℃
                </Typography>
                <img style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }} src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weatherImage'/>
                <Typography variant="body2" color="textSecondary" component="p">
                    Feels like: {generalInfoTemp.feels_like} ℃
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    High: {generalInfoTemp.temp_max} ℃
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Low: {generalInfoTemp.temp_min} ℃
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Wind: {wind.speed} m/s
                </Typography>
            </CardContent>
        </Card>
    )
}