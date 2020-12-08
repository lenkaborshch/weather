import React from 'react'
import {Tooltip} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'
import {Delete} from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {deleteCityCard, getCityCard} from '../../../../store/citiesCardsReducer'
import {getDateNow} from '../../../../utils/dataDate'
import {CityCardHeaderType} from '../../../../types/types'

const useStyles = makeStyles(() =>
    createStyles({
        cityName: {
            lineHeight: '1'
        },
        headerCard: {
            maxHeight: '50px'
        },
    })
)

export const CityCardHeader = React.memo((props: CityCardHeaderType) => {
    let {cityId, cityName} = props
    const currentDate = getDateNow(new Date())

    const dispatch = useDispatch()
    const classes = useStyles()

    const deleteCardClick = () => {
        dispatch(deleteCityCard(cityId))
    }
    const refreshCardClick = () => {
        dispatch(getCityCard(cityName, 'UPDATE'))
    }

    return (
        <CardHeader
            className={classes.headerCard}
            action={
                <div>
                    <Tooltip title='Refresh'>
                        <IconButton onClick={refreshCardClick}>
                            <RefreshRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton onClick={deleteCardClick}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </div>
            }
            title={
                <Typography variant='h5' component='h1' className={classes.cityName}>
                    {cityName}
                </Typography>
            }
            subheader={currentDate}
        />
    )
})