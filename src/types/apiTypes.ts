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

export type getMyDictionariesType = Array<{
    id: number
    name: string
    createdAt: string
    isPublic: boolean
    words: Array<{
        id: number
        name: string
        translation: string
        isLearned: boolean
        createdAt: string
    }>
    learned: number
    total: number
}>

export type getDictionariesType = Array<{
    id: number
    createdAt: string
    isPublic: boolean
    name: string
    words: [
        {
            id: number
            name: string
            translation: string
            isLearned: boolean
            createdAt: string
        }
    ]
}>
