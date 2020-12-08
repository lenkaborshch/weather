import React from 'react'
import {Typography} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {HeaderDetailsWeatherPropsType} from '../../../types/types'

const useStyles = makeStyles(() =>
    createStyles({
        cityName: {
            marginTop: '15px'
        },
    })
)

export const HeaderDetailsWeather = React.memo((props: HeaderDetailsWeatherPropsType) => {
        const classes = useStyles()
        let {cityName, currentTemp, descriptionWeather} = props

        return (
            <div>
                <Typography variant={'h3'} className={classes.cityName}>
                    {cityName}
                </Typography>
                <Typography variant={'h4'}>
                    {currentTemp}°C
                </Typography>
                <Typography variant={'subtitle2'}>
                    {descriptionWeather}
                </Typography>
            </div>
        )
    }
)