import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from './store/store'
import {AppBar, Container, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar'
import {Route, Switch} from 'react-router-dom'
import {ShortWeather} from './components/ShortWeather/ShortWeather'
import {DetailsWeather} from './components/DetailsWeather/DetailsWeather'
import {getSeveralCitiesCard} from './store/citiesCardsReducer'
import {GetWeatherCityType} from './types/types'

export const App = () => {
    const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<AppStateType, null | string>(state => state.app.error)
    const cities = useSelector<AppStateType, Array<GetWeatherCityType>>(state => state.citiesCardsWeather.citiesCards)
    const dispatch = useDispatch()

    useEffect(() => {
        const localDataCards = localStorage.getItem('cityCards')

        if (localDataCards && localDataCards !== '[]') {
            let citiesId = JSON.parse(localDataCards).reverse().join()
            dispatch(getSeveralCitiesCard(citiesId))
        }
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('cityCards', JSON.stringify(cities.map((el) => el.id)))
    }, [cities])

    return (
        <div>
            {error && <ErrorSnackbar/>}
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>
                        Weather
                    </Typography>
                </Toolbar>
                {isLoading && <LinearProgress color='secondary'/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path='/'><ShortWeather cities={cities}/></Route>
                    <Route path='/details/:cityName'><DetailsWeather/></Route>
                </Switch>
            </Container>
        </div>
    )
}