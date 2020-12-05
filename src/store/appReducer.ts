
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING'

const initialState = {
    isLoading: false
}
export type AppReducerType = typeof initialState


export const appReducer = (state = initialState, action: ActionsType): AppReducerType => {
    switch (action.type) {
        case TOGGLE_IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        default: {
            return state
        }
    }
}

export const toggleIsLoading = (isLoading: boolean) => ({type: TOGGLE_IS_LOADING, isLoading} as const)


type ActionsType = ReturnType<typeof toggleIsLoading>