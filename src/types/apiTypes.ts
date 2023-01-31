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
    learned: number
    total: number
    updatedAt: string
}>

export type getDictionariesType = {
    limit: number
    page: number
    pages: number
    count: number
    dictionaries: Array<{
        id: number
        createdAt: string
        learned: number
        updatedAt: string
        isPublic: boolean
        name: string
        total: number
    }>
}

export type wordType = {
    id: number
    name: string
    translation: string
    createdAt: string
    isLearned: boolean
}

export type getWordsByDictionaryIdType = {
    count: number
    limit: number
    page: number
    pages: number
    words: Array<wordType>
}

export type deleteWordType = {
    success: boolean
}

export type createDictionaryType = {
    createdAt: string
    id: number
    isPublic: boolean
    name: string
    updatedAt: string
}

