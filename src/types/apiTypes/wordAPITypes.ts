export type wordType = {
    id: number
    name: string
    translation: string
    createdAt: string
    updatedAt: string
    isLearned: boolean
}

//--------------------get--------------

export type getWordsFromDictionaryRequestType = {
    dictionaryId: number
    page: number
    limit: number
}

export type getWordsFromDictionaryResponseType = {
    words: Array<wordType>
    count: number
    limit: number
    page: number
    pages: number
}

//--------------------create--------------

export type createWordRequestType = {
    dictionaryId: number
    name: string
    translation: string
}

//--------------------update--------------

export type updateWordRequestType = {
    wordId: number
    name: string
    translation: string
}

//--------------------delete--------------

export type deleteWordRequestType = {
    wordId: number
}

export type deleteWordResponseType = {
    success: boolean
}
