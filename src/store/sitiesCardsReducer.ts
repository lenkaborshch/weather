import {currentWeatherAPI, GetWeatherAPIType} from '../api/api'
import {Dispatch} from 'redux'
import {setError, toggleIsLoading} from './appReducer'
import {AppStateType} from './store'

const ADD_CITY_CARD = 'ADD_CITY_CARD'
const DELETE_CITY_CARD = 'DELETE_CITY_CARD'
const UPDATE_CITY_CARD = 'UPDATE_CITY_CARD'

const initialState: SitiesCardsType = []
export type SitiesCardsType = Array<GetWeatherAPIType>


export const sitiesCardsReducer = (state = initialState, action: ActionsType): SitiesCardsType => {
    switch (action.type) {
        case ADD_CITY_CARD: {
            return [action.cityCard, ...state]
        }
        case DELETE_CITY_CARD: {
            return state.filter(el => el.id !== action.cityId)
        }
        case UPDATE_CITY_CARD: {
            const cardIndex = state.findIndex(el => el.id === action.cityCard.id)
            state[cardIndex] = action.cityCard
            return [...state]
        }
        default: {
            return state
        }
    }
}

const addCityCard = (cityCard: GetWeatherAPIType) => ({type: ADD_CITY_CARD, cityCard} as const)
const updateCityCard = (cityCard: GetWeatherAPIType) => ({type: UPDATE_CITY_CARD, cityCard} as const)
export const deleteCityCard = (cityId: number) => ({type: DELETE_CITY_CARD, cityId} as const)


export const getCityCard = (cityName: string, action: 'ADD' | 'UPDATE') => {
    return async (dispatch: Dispatch, getState: () => AppStateType) => {
        try {
            dispatch(toggleIsLoading(true))
            let result = await currentWeatherAPI.getCurrentWeather(cityName)
            if (action === 'ADD') {
                const isDuplicateCity = getState().citiesCards.find(el => el.id === result.id)
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

type ActionsType = ReturnType<typeof addCityCard>
    | ReturnType<typeof deleteCityCard>
    | ReturnType<typeof updateCityCard>