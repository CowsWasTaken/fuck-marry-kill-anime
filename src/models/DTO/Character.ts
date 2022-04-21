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
    favorites: string, 
    gender: string
}