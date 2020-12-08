import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import {CityCardHeader} from './CItyCardHeader/CityCardHeader'
import {CityCardContent} from './CityCardContent/CityCardContent'
import {CommonCityCardPropsType} from '../../../types/types'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: 250,
            height: 350,
            background: 'rgba(242, 173, 104, 0.6)',
        },
    })
)

export const CityCard = React.memo((props: CommonCityCardPropsType) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CityCardHeader cityId={props.cityId} cityName={props.cityName}/>
            <CityCardContent {...props}/>
        </Card>
    )
})