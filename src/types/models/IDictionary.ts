export interface IDictionary {
    id: number
    createdAt: string
    learned: number
    updatedAt: string
    isPublic: boolean
    name: string
    total: number
}

export interface ICreateDictionaryWithWordsRequest {
    dictionaryName: string
    isPublic: boolean
    words: Array<{ name: string; translation: string }>
}

export type IGetAllPublicDictionariesResponse = {
    dictionaries: IDictionary[]
    count: number
    page: number
    limit: number
    pages: number
}
