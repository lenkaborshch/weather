import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {Button, LinearProgress} from '@material-ui/core'
import {ChartTemperature} from './ChartTemperature/ChartTemperature'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {getDetailsCityCard} from '../../store/citiesCardsReducer'
import {roundingValue} from '../../utils/roundingValue'
import {convertToHour} from '../../utils/dataDate'
import {useHistory, useParams} from 'react-router-dom'
import {GetDetailsCityCardType, GetWeatherCityType} from '../../types/types'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {HeaderDetailsWeather} from './HeaderDetailsWeather/HeaderDetailsWeather'
import {DetailsInfoWeather} from './DetailsInfoWeather/DetailsInfoWeather'

const useStyles = makeStyles(() =>
    createStyles({
        detailsPageWeather: {
            textAlign: 'center'
        },
        additionalInfo: {
            marginTop: '70px'
        }
    })
)

export const DetailsWeather = React.memo(() => {
        const classes = useStyles()
        const history = useHistory()
        const dispatch = useDispatch()
        const params: { cityName: string } = useParams()

        const cities = useSelector<AppStateType, Array<GetWeatherCityType>>(state => state.citiesCardsWeather.citiesCards)
        const city = cities.find(el => el.name === params.cityName)
        const detailCityCard = useSelector<AppStateType, GetDetailsCityCardType>(state => state.citiesCardsWeather.detailsCityCard)

        useEffect(() => {
            if (city) {
                dispatch(getDetailsCityCard(city.coord.lat, city.coord.lon))
            }
        }, [city, dispatch])

        if (Object.keys(detailCityCard).length === 0) return <LinearProgress/>

        const redirectToCityCards = () => {
            history.push(`/`)
        }

        const currentTemp = roundingValue(detailCityCard.current.temp)
        const descriptionWeather = detailCityCard.current.weather[0].main
        const feelsLikeTemp = roundingValue(detailCityCard.current.feels_like)
        const humidity = detailCityCard.current.humidity
        const sunrise = convertToHour(detailCityCard.current.sunrise)
        const sunset = convertToHour(detailCityCard.current.sunset)

        return (
            <div className={classes.detailsPageWeather}>
                <HeaderDetailsWeather cityName={params.cityName} currentTemp={currentTemp}
                                      descriptionWeather={descriptionWeather}/>
                <Grid container spacing={3}>
                    <Grid item>
                        <ChartTemperature detailCityCard={detailCityCard}/>
                    </Grid>
                    <Grid item className={classes.additionalInfo}>
                        <DetailsInfoWeather feelsLikeTemp={feelsLikeTemp} humidity={humidity}
                                            sunrise={sunrise} sunset={sunset}/>
                    </Grid>
                </Grid>
                <Button onClick={redirectToCityCards} variant='contained' color='secondary'>
                    Come back
                </Button>
            </div>
        )
    }
)