import React from 'react'
import './App.css'
import {useSelector} from 'react-redux'
import {AppStateType} from './store/store'
import {SitiesCardsType} from './store/sitiesCardsReducer'
import {CityCard} from './components/Card/Card'
import Grid from '@material-ui/core/Grid'
import {AppBar, Container, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {CitySearchForm} from './components/CitySearchForm/CitySearchForm'

export const App = () => {
    const cities = useSelector<AppStateType, SitiesCardsType>(state => state.sitiesCards)
    const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Weather
                    </Typography>
                </Toolbar>
                {isLoading && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <CitySearchForm/>
                <Grid container spacing={3}>
                    {cities.map((city) => {
                        return (
                            <Grid item key={city.id}>
                                <CityCard cityId={city.id} cityName={city.name}
                                          infoTemp={city.main} wind={city.wind}
                                          icon={city.weather[0].icon}/>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
}