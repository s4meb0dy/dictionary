export type dictionaryType = {
    id: number
    createdAt: string
    learned: number
    updatedAt: string
    isPublic: boolean
    name: string
    total: number
}

//--------------------get--------------

export type getMyDictionariesResponseType = Array<dictionaryType>

export type getAllPublicDictionariesRequestType = {
    page: number
    limit: number
}

export type getAllPublicDictionariesResponseType = {
    dictionaries: Array<dictionaryType>
    count: number
    page: number
    limit: number
    pages: number
}

//--------------------create--------------

export type createDictionaryRequestType = {
    dictionaryName: string
    isPublic: boolean
    words: Array<{ name: string; translation: string }>
}

export type createDictionaryResponseType = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    isPublic: boolean
    total: number
    learned: number
}
