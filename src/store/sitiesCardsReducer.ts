import {GetWeatherAPIType} from '../api/api'

const initialState: SitiesCardsType = [
    {
        'coord': {
            'lon': 30.52,
            'lat': 50.43
        },
        'weather': [
            {
                'id': 804,
                'main': 'Clouds',
                'description': 'overcast clouds',
                'icon': '04d'
            }
        ],
        'base': 'stations',
        'main': {
            'temp': 4,
            'feels_like': 2,
            'temp_min': -2,
            'temp_max': 5,
            'pressure': 1025,
            'humidity': 96
        },
        'visibility': 7000,
        'wind': {
            'speed': 4,
            'deg': 130
        },
        'clouds': {
            'all': 90
        },
        'dt': 1607002084,
        'sys': {
            'type': 1,
            'id': 8903,
            'country': 'UA',
            'sunrise': 1606973979,
            'sunset': 1607003784
        },
        'timezone': 7200,
        'id': 703448,
        'name': 'Kyiv',
        'cod': 200
    },
    {
        'coord': {
            'lon': 30.52,
            'lat': 50.43
        },
        'weather': [
            {
                'id': 804,
                'main': 'Clouds',
                'description': 'overcast clouds',
                'icon': '04d'
            }
        ],
        'base': 'stations',
        'main': {
            'temp': 2,
            'feels_like': 0,
            'temp_min': -5,
            'temp_max': 4,
            'pressure': 1025,
            'humidity': 96
        },
        'visibility': 7000,
        'wind': {
            'speed': 5,
            'deg': 130
        },
        'clouds': {
            'all': 90
        },
        'dt': 1607002084,
        'sys': {
            'type': 1,
            'id': 8903,
            'country': 'UA',
            'sunrise': 1606973979,
            'sunset': 1607003784
        },
        'timezone': 7200,
        'id': 703448,
        'name': 'Kharkiv',
        'cod': 200
    },
    {
        'coord': {
            'lon': 30.52,
            'lat': 50.43
        },
        'weather': [
            {
                'id': 804,
                'main': 'Clouds',
                'description': 'overcast clouds',
                'icon': '04d'
            }
        ],
        'base': 'stations',
        'main': {
            'temp': 5,
            'feels_like': 3,
            'temp_min': -1,
            'temp_max': 5,
            'pressure': 1025,
            'humidity': 96
        },
        'visibility': 7000,
        'wind': {
            'speed': 2,
            'deg': 130
        },
        'clouds': {
            'all': 90
        },
        'dt': 1607002084,
        'sys': {
            'type': 1,
            'id': 8903,
            'country': 'UA',
            'sunrise': 1606973979,
            'sunset': 1607003784
        },
        'timezone': 7200,
        'id': 703448,
        'name': 'Lviv',
        'cod': 200
    },
]

export type SitiesCardsType = Array<GetWeatherAPIType>

type ActionType = {}

export const sitiesCardsReducer = (state = initialState, action: ActionType): SitiesCardsType => {
    return state
}