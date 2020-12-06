const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'
const SET_ERROR = 'SET_ERROR'

const initialState = {
    isLoading: false,
    error: null as null | string
}
export type AppReducerType = typeof initialState


export const appReducer = (state = initialState, action: ActionsType): AppReducerType => {
    switch (action.type) {
        case TOGGLE_IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        case SET_ERROR: {
            return {...state, error: action.error}
        }
        default: {
            return state
        }
    }
}

export const toggleIsLoading = (isLoading: boolean) => ({type: TOGGLE_IS_LOADING, isLoading} as const)
export const setError = (error: null | string) => ({type: SET_ERROR, error} as const)


type ActionsType = ReturnType<typeof toggleIsLoading> | ReturnType<typeof setError>