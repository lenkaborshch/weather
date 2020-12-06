import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import {CityCardHeader} from './CItyCardHeader/CityCardHeader'
import {CityCardContent} from './CityCardContent/CityCardContent'

type InfoTempType = {
    'temp': number
    'feels_like': number
    'temp_min': number
    'temp_max': number
    'pressure': number
    'humidity': number
}

type CardPropsType = {
    cityId: number
    cityName: string
    infoTemp: InfoTempType
    wind: {
        'speed': number
        'deg': number
    }
    icon: string
}


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: 250,
            height: 350,
            background: 'rgba(242, 173, 104, 0.6)',
        },
    })
)

export const CityCard = React.memo((props: CardPropsType) => {
    let {cityId, cityName, infoTemp, wind, icon} = props
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CityCardHeader cityId={cityId} cityName={cityName}/>
            <CityCardContent infoTemp={infoTemp} wind={wind} icon={icon}/>
        </Card>
    )
})