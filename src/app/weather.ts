export interface Weather {
    city: {
        name: string
    },
    list: {
        main: {
            temp: number
            temp_min: number,
            temp_max: number
        }
    }
}