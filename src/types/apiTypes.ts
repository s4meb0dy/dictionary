export type loginResponseType = {
    access_token: string
    createdAt: string
    email: string
    id: number
    isConfirmed: boolean
    username: string
}

export type userInfoResponseType = {
    createdAt: string
    email: string
    id: number
    isConfirmed: boolean
    username: string
}

export type getDictionaryType = Array<{
    id: number
    name: string
    createdAt: string
    isPublic: boolean
    words: Array<string>
    learned: number
    total: number
}>
