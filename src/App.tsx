import React, {useEffect} from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from './store/store'
import {getSeveralCitiesCard, SitiesCardsType} from './store/sitiesCardsReducer'
import {CityCard} from './components/CityCard/CityCard'
import Grid from '@material-ui/core/Grid'
import {AppBar, Container, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {CitySearchForm} from './components/CitySearchForm/CitySearchForm'
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar'

export const App = () => {
    const cities = useSelector<AppStateType, SitiesCardsType>(state => state.citiesCards)
    const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<AppStateType, null | string>(state => state.app.error)
    const dispatch = useDispatch()

    const citiesCards = cities.map(city => {
        return (
            <Grid item key={city.id}>
                <CityCard cityId={city.id} cityName={city.name}
                          infoTemp={city.main} wind={city.wind}
                          icon={city.weather[0].icon}/>
            </Grid>)
    })

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
        <div className='App'>
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
                <CitySearchForm/>
                <Grid container spacing={3}>
                    {citiesCards}
                </Grid>
            </Container>
        </div>
    )
}