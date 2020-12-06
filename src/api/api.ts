import axios from 'axios'

const API_KEY = 'd047497993add0ea996af560b7e11c70'

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/`,
})

export const currentWeatherAPI = {
    getCurrentWeather(cityName: string) {
        return instance.get<GetWeatherAPIType>(`data/2.5/weather?appid=${API_KEY}&units=metric&q=${cityName}`)
            .then(res => res.data)
    },
    getCurrentWeatherForSeveral(citiesId: string) {
        return instance.get<GetWeatherAPIForSeveralType>(`data/2.5/group?id=${citiesId}&appid=${API_KEY}&units=metric`)
            .then(res => res.data)
    },
}

export type GetWeatherAPIType = {
    coord: {
        lon: number
        lat: number
    },
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ],
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    },
    visibility: number
    wind: {
        'speed': number
        'deg': number
    },
    clouds: {
        all: number
    },
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    },
    timezone: number
    id: number
    name: string
    cod: number
}
export type GetWeatherAPIForSeveralType = {
    cnt: number
    list: Array<GetWeatherAPIType>
}