import { Character } from "./Character"


export interface Media {
    title: {
        userPreferred: string
    }
    status: string, 
    siteUrl: string, 
    coverImage:  {
        large: string
    }, 
    characters :{
        nodes: Character[]
    }
}