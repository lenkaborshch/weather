import React from 'react'
import {Chart} from 'react-google-charts'
import Grid from '@material-ui/core/Grid'
import {convertToHour} from '../../../utils/dataDate'
import {roundingValue} from '../../../utils/roundingValue'
import {ChartTempType} from '../../../types/types'


export const ChartTemperature = React.memo((props: ChartTempType) => {
        let {detailCityCard} = props

        let dataWeatherHourly = detailCityCard.hourly.map(el => {
            let hour = convertToHour(el.dt)
            let temp = roundingValue(el.temp)
            let array: Array<any> = [hour, temp]
            return array
        })

        let data: Array<number[] | string[]> = [['Hour', 'Temperature']]

        if (dataWeatherHourly) {
            for (let i = 0; i < 24; i++) {
                data.push(dataWeatherHourly[i])
            }
        }

        return (
            <Grid item style={{textAlign: 'center'}}>
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType='LineChart'
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        hAxis: {title: 'Hour'},
                        vAxis: {title: 'Temperature'},
                        legend: 'none',
                        backgroundColor: 'transparent',
                        series: {
                            0: {color: '#e2431e'},
                        }
                    }}
                />
            </Grid>
        )
    }
)