import {currentWeatherAPI} from '../api/api'
import {Dispatch} from 'redux'
import {setError, toggleIsLoading} from './appReducer'
import {AppStateType} from './store'
import {ActionsType, GetDetailsCityCardType, GetWeatherCityType} from '../types/types'

const ADD_CITY_CARD = 'ADD_CITY_CARD'
const DELETE_CITY_CARD = 'DELETE_CITY_CARD'
const UPDATE_CITY_CARD = 'UPDATE_CITY_CARD'
const SET_DETAILS_CITY_CARD = 'SET_DETAILS_CITY_CARD'

const initialState = {
    citiesCards: [] as Array<GetWeatherCityType>,
    detailsCityCard: {} as GetDetailsCityCardType
}
export type CitiesCardsReducerType = typeof initialState

export const citiesCardsReducer = (state = initialState, action: ActionsType): CitiesCardsReducerType => {
    switch (action.type) {
        case ADD_CITY_CARD: {
            return {
                ...state,
                citiesCards: [action.cityCard, ...state.citiesCards]
            }
        }
        case DELETE_CITY_CARD: {
            return {
                ...state,
                citiesCards: state.citiesCards.filter(el => el.id !== action.cityId)
            }
        }
        case UPDATE_CITY_CARD: {
            const cardIndex = state.citiesCards.findIndex(el => el.id === action.cityCard.id)
            state.citiesCards[cardIndex] = action.cityCard
            return {
                ...state,
                citiesCards: [...state.citiesCards]
            }
        }
        case SET_DETAILS_CITY_CARD: {
            return {
                ...state,
                detailsCityCard: action.detailsCityCard
            }
        }
        default: {
            return state
        }
    }
}

export const addCityCard = (cityCard: GetWeatherCityType) => ({type: ADD_CITY_CARD, cityCard} as const)
export const updateCityCard = (cityCard: GetWeatherCityType) => ({type: UPDATE_CITY_CARD, cityCard} as const)
export const setDetailsCityCard = (detailsCityCard: GetDetailsCityCardType) => ({
    type: SET_DETAILS_CITY_CARD,
    detailsCityCard
} as const)
export const deleteCityCard = (cityId: number) => ({type: DELETE_CITY_CARD, cityId} as const)


export const getCityCard = (cityName: string, action: 'ADD' | 'UPDATE') => {
    return async (dispatch: Dispatch, getState: () => AppStateType) => {
        try {
            dispatch(toggleIsLoading(true))
            let result = await currentWeatherAPI.getCurrentWeather(cityName)
            if (action === 'ADD') {
                const isDuplicateCity = getState().citiesCardsWeather.citiesCards.find(el => el.id === result.id)
                isDuplicateCity ? dispatch(setError('This city was selected')) : dispatch(addCityCard(result))
            } else if (action === 'UPDATE') {
                dispatch(updateCityCard(result))
            }
            dispatch(toggleIsLoading(false))
        } catch (err) {
            dispatch(setError('Error! This city not found'))
            dispatch(toggleIsLoading(false))
        }
    }
}

export const getSeveralCitiesCard = (citiesId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        let result = await currentWeatherAPI.getCurrentWeatherForSeveral(citiesId)
        result.list.forEach(el => dispatch(addCityCard(el)))
        dispatch(toggleIsLoading(false))
    } catch (err) {
        dispatch(setError('Error!'))
        dispatch(toggleIsLoading(false))
    }
}

export const getDetailsCityCard = (lat: number, lon: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        let result = await currentWeatherAPI.getWeatherForHours(lat, lon)
        dispatch(setDetailsCityCard(result))
        dispatch(toggleIsLoading(false))
    } catch (err) {
        dispatch(setError('Error!'))
        dispatch(toggleIsLoading(false))
    }
}

