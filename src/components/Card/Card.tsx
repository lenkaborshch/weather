import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {Tooltip} from '@material-ui/core'
import {DeleteRounded} from '@material-ui/icons'

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
}

const date = new Date().toLocaleString('ru', options)

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

type CardPropsType = {
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
    }
}

export function CityCard(props: CardPropsType) {
    let {cityName, generalInfoTemp, wind} = props

    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false)

    const deleteCardClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={deleteCardClick}>
                            <DeleteRounded/>
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
                }} src='http://openweathermap.org/img/wn/10d@2x.png' alt='weatherImage'/>
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