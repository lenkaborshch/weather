export const convertToHour = (hourUnix: number): string => {
    let date = new Date(hourUnix * 1000)
    let hour = date.getHours()
    let minutes = date.getMinutes()

    return hour < 10
        ? minutes < 10
            ? `0${hour}:0${minutes}`
            : `0${hour}:${minutes}`
        : `${hour}:00`
}

export const getDateNow = (date: Date) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let month = months[date.getMonth()]
    let dayOfWeek = days[date.getDay()]

    return `${dayOfWeek} ${date.getDate()} ${month}`
}