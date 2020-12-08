import {CitySearchForm} from './CitySearchForm/CitySearchForm'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import {CityCard} from './CityCard/CityCard'
import {ShortWeatherType} from '../../types/types'

export const ShortWeather = React.memo((props: ShortWeatherType) => {
    return (
        <>
            <CitySearchForm/>
            <Grid container spacing={3}>
                {
                    props.cities.map(city => {
                        return (
                            <Grid item key={city.id}>
                                <CityCard cityId={city.id} cityName={city.name}
                                          infoByTemp={city.main} wind={city.wind}
                                          icon={city.weather[0].icon}/>
                            </Grid>)
                    })
                }
            </Grid>
        </>
    )
})