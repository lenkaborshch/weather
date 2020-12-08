import React from 'react'
import Typography from '@material-ui/core/Typography'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import {useHistory} from 'react-router-dom'
import {roundingTemp, roundingValue} from '../../../../utils/roundingValue'
import {getImgWeather} from '../../../../api/api'
import {CommonCityCardPropsType} from '../../../../types/types'

const useStyles = makeStyles(() =>
    createStyles({
        cardContent: {
            cursor: 'pointer'
        },
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

export const CityCardContent = React.memo((props: CommonCityCardPropsType) => {
    let {cityName, infoByTemp, wind, icon} = props

    let infoTemp = roundingTemp({...infoByTemp})
    let windSpeed = roundingValue(wind.speed)

    const classes = useStyles()
    const history = useHistory()

    const redirectToDetails = () => {
        history.push(`/details/${cityName}`)
    }

    return (
        <CardContent onClick={redirectToDetails} className={classes.cardContent}>
            <Typography variant='h5' component='p' className={classes.tempNow}>
                {infoTemp.temp}°C
            </Typography>
            <img className={classes.iconWeather} src={getImgWeather(icon)} alt='weatherImage'/>
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
                Wind: {windSpeed} m/s
            </Typography>
        </CardContent>
    )
})