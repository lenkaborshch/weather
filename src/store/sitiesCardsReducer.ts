import {currentWeatherAPI, GetWeatherAPIType} from '../api/api'
import {Dispatch} from 'redux'
import {toggleIsLoading} from './appReducer'

const ADD_CITY_CARD = 'ADD_CITY_CARD'
const DELETE_CITY_CARD = 'DELETE_CITY_CARD'

const initialState: SitiesCardsType = []
export type SitiesCardsType = Array<GetWeatherAPIType>


export const sitiesCardsReducer = (state = initialState, action: ActionsType): SitiesCardsType => {
    switch (action.type) {
        case ADD_CITY_CARD: {
            return [action.cityCard, ...state]
        }
        case DELETE_CITY_CARD: {
            return state.filter(card => card.id !== action.cityId)
        }
        default: {
            return state
        }
    }
}

const addCityCard = (cityCard: any) => ({type: ADD_CITY_CARD, cityCard} as const)
export const deleteCityCard = (cityId: number) => ({type: DELETE_CITY_CARD, cityId} as const)

export const addCity = (cityName: string) => (dispatch: Dispatch) => {
    dispatch(toggleIsLoading(true))
    return currentWeatherAPI.getWeatherForCity(cityName)
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

type ActionsType = ReturnType<typeof addCityCard> | ReturnType<typeof deleteCityCard>
