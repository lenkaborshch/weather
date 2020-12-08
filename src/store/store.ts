import {applyMiddleware, combineReducers, createStore} from 'redux'
import {citiesCardsReducer} from './citiesCardsReducer'
import thunk from 'redux-thunk'
import {appReducer} from './appReducer'

const rootReducer = combineReducers({
    citiesCardsWeather: citiesCardsReducer,
    app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store