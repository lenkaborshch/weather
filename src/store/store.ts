import {combineReducers, createStore} from 'redux'
import {sitiesCardsReducer} from './sitiesCardsReducer'

const rootReducer = combineReducers({
    sitiesCards: sitiesCardsReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

//@ts-ignore
window.store = store