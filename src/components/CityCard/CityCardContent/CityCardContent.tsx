import React from 'react'
import Typography from '@material-ui/core/Typography'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'

type InfoTempType = {
    'temp': number
    'feels_like': number
    'temp_min': number
    'temp_max': number
    'pressure': number
    'humidity': number
}

type CityCardContentType = {
    infoTemp: InfoTempType
    wind: {
        'speed': number
        'deg': number
    }
    icon: string
}

const useStyles = makeStyles(() =>
    createStyles({
        tempNow: {
            textAlign: 'center',
            fontSize: '30px'
        },
        iconWeather: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    })
)

const roundingTemp = (infoTemp: InfoTempType): InfoTempType => {
    for (let objKey in infoTemp) {
        // @ts-ignore
        infoTemp[objKey] = Math.round(infoTemp[objKey])
    }
    return infoTemp
}


export const CityCardContent = React.memo((props: CityCardContentType) => {
    let {infoTemp, wind, icon} = props
    infoTemp = roundingTemp(infoTemp)

    const classes = useStyles()

    return (
        <CardContent>
            <Typography variant='h5' component='p' className={classes.tempNow}>
                {infoTemp.temp}°C
            </Typography>
            <img className={classes.iconWeather} src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                 alt='weatherImage'/>
            <Typography variant='body2' color='textSecondary' component='p'>
                Feels like: {infoTemp.feels_like} ℃
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
                High: {infoTemp.temp_max} ℃
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
                Low: {infoTemp.temp_min} ℃
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
                Wind: {wind.speed} m/s
            </Typography>
        </CardContent>
    )
})