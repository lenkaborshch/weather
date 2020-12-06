import {applyMiddleware, combineReducers, createStore} from 'redux'
import {sitiesCardsReducer} from './sitiesCardsReducer'
import thunk from 'redux-thunk'
import {appReducer} from './appReducer'

const rootReducer = combineReducers({
    citiesCards: sitiesCardsReducer,
    app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store