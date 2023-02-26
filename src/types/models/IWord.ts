export interface IWord {
    id: number
    name: string
    translation: string
    createdAt: string
    updatedAt: string
    isLearned: boolean
}


export interface IGetWordsFromDictionaryResponse {
    words: IWord[]
    count: number
    limit: number
    page: number
    pages: number
}

export interface IWordRequest {
    name?: string
    translation?: string
}

export interface ICreateWordRequest {
    name?: string
    translation?: string
    wordId: number
}