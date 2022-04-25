export interface Character {
    id: number,
    name: {
        full: string,
        userPreferred: string
    },
    image :{
        large: string
    },
    siteUrl: string,
    favourites: number,
    gender: string
}
