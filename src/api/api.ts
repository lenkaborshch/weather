import axios from 'axios'
import {GetDetailsCityCardType, GetWeatherCityType, GetWeatherForCitiesType} from '../types/types'

const API_KEY = 'd047497993add0ea996af560b7e11c70'

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,
})

export const currentWeatherAPI = {
    getCurrentWeather(cityName: string) {
        return instance.get<GetWeatherCityType>(`weather?appid=${API_KEY}&units=metric&q=${cityName}`)
            .then(res => res.data)
    },
    getCurrentWeatherForSeveral(citiesId: string) {
        return instance.get<GetWeatherForCitiesType>(`group?id=${citiesId}&appid=${API_KEY}&units=metric`)
            .then(res => res.data)
    },
    getWeatherForHours(lat: number, lon: number) {
        return instance.get<GetDetailsCityCardType>(`onecall?lat=${lat}&lon=${lon}&exclude=daily,alerts,minutely&appid=${API_KEY}&units=metric`)
            .then(res => res.data)
    },
}

export const getImgWeather = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
}