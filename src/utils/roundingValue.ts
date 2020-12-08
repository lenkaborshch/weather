import {InfoByTempType} from '../types/types'

export const roundingTemp = (infoTemp: InfoByTempType): InfoByTempType => {
    let copyInfoTemp = {...infoTemp}
    for (let objKey in copyInfoTemp) {
        // @ts-ignore
        copyInfoTemp[objKey] = roundingValue(copyInfoTemp[objKey])
    }
    return copyInfoTemp
}

export const roundingValue = (value: number): number => {
    return Math.round(value)
}