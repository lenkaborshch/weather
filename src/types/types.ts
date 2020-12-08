import {addCityCard, deleteCityCard, setDetailsCityCard, updateCityCard} from '../store/citiesCardsReducer'
import {setError, toggleIsLoading} from '../store/appReducer'

//API types
export type GetWeatherCityType = {
    coord: {
        lon: number
        lat: number
    },
    weather: Array<WeatherType>
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
export type GetWeatherForCitiesType = {
    cnt: number
    list: Array<GetWeatherCityType>
}
export type GetDetailsCityCardType = {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: CurrentWeatherType
    hourly: Array<HourlyWeatherType>
}
type WeatherCommon = {
    'dt': number
    'temp': number
    'feels_like': number
    'pressure': number
    'humidity': number
    'dew_point': number
    'uvi': number
    'clouds': number
    'visibility': number
    'wind_speed': number
    'wind_deg': number
    'weather': Array<WeatherType>
}
type WeatherType = {
    'id': number
    'main': string
    'description': string
    'icon': string
}

export interface CurrentWeatherType extends WeatherCommon {
    'sunrise': number
    'sunset': number
    'wind_gust': number
}
export interface HourlyWeatherType extends WeatherCommon {
    'pop': number
}


//for reducers
export type ActionsType = ReturnType<typeof addCityCard>
    | ReturnType<typeof deleteCityCard>
    | ReturnType<typeof updateCityCard>
    | ReturnType<typeof setDetailsCityCard>
    | ReturnType<typeof toggleIsLoading>
    | ReturnType<typeof setError>


//for utils
export type InfoByTempType = {
    'temp': number
    'feels_like': number
    'temp_min': number
    'temp_max': number
    'pressure': number
    'humidity': number
}


//for components
export type ShortWeatherType = {
    cities: Array<GetWeatherCityType>,
}

//CityCard, CityCardContent
export type CommonCityCardPropsType = {
    cityId: number
    cityName: string
    infoByTemp: InfoByTempType
    wind: {
        'speed': number
        'deg': number
    }
    icon: string
}

//CityCardHeader
export type CityCardHeaderType = {
    cityId: number
    cityName: string
}

//ChartTemperature
export type ChartTempType = {
    detailCityCard: GetDetailsCityCardType
}

//HeaderWeatherDetails
export type HeaderDetailsWeatherPropsType = {
    cityName: string
    currentTemp: number
    descriptionWeather: string
}

//DetailsInfoWeather
export type DetailsInfoWeatherPropType = {
    feelsLikeTemp: number
    humidity: number
    sunrise: string
    sunset: string
}