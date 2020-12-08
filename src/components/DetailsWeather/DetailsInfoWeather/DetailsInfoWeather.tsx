import React from 'react'
import {Typography} from '@material-ui/core'
import { DetailsInfoWeatherPropType } from '../../../types/types'

export const DetailsInfoWeather = React.memo((props: DetailsInfoWeatherPropType) => {
        let {feelsLikeTemp, humidity, sunrise, sunset} = props

        return (
            <>
                <Typography variant={'h6'}>
                    Feels like: {feelsLikeTemp} °C
                </Typography>
                <Typography variant={'h6'}>
                    Humidity: {humidity} %
                </Typography>
                <Typography variant={'h6'}>
                    Sunrise: {sunrise}
                </Typography>
                <Typography variant={'h6'}>
                    Sunset: {sunset}
                </Typography>
            </>
        )
    }
)