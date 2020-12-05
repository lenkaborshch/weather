import React from 'react'
import './App.css'
import {useSelector} from 'react-redux'
import {AppStateType} from './store/store'
import {SitiesCardsType} from './store/sitiesCardsReducer'
import {CityCard} from './components/Card/Card'
import Grid from '@material-ui/core/Grid'
import {Container} from '@material-ui/core'

export const App = () => {
    const cities = useSelector<AppStateType, SitiesCardsType>(state => state.sitiesCards)

    return (
        <div className='App'>
            <Container fixed>
                <Grid container spacing={3}>
                    {cities.map((city) => {
                        return (
                            <Grid item key={city.id}>
                                <CityCard cityName={city.name} generalInfoTemp={city.main} wind={city.wind}/>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    )
}