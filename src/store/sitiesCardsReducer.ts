import {currentWeatherAPI, GetWeatherAPIType} from '../api/api'
import {Dispatch} from 'redux'
import {toggleIsLoading} from './appReducer'

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

export const addCity = (cityName: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsLoading(true))
    return currentWeatherAPI.getWeatherByName(cityName)
        .then(res => {
            if (res.cod === 200) {
                dispatch(addCityCard(res))
            }
        })
        .finally(() => {
                dispatch(toggleIsLoading(false))
            }
        )
}

export const updateCity = (cityId: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsLoading(true))
    return currentWeatherAPI.getWeatherById(cityId)
        .then(res => {
            if (res.cod === 200) {
                dispatch(updateCityCard(res))
            }
        })
        .finally(() => {
                dispatch(toggleIsLoading(false))
            }
        )
}

type ActionsType = ReturnType<typeof addCityCard>
    | ReturnType<typeof deleteCityCard>
    | ReturnType<typeof updateCityCard>
