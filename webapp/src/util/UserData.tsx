export type Friend = {
    name : string,
    webId : string
}

export type Group = {
    name: string,
    webId?: string,
    members: Friend[]
}

export type Location = {
    id?: string,
    nameLocation: string,
    name: string,
    category: string,
    comments?: string,
    latitud?: number,
    longitud?: number,
    score?: number,
    image?: File
    
}
