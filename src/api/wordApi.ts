import {
    deleteWordType,
    getWordsByDictionaryIdType,
    wordType,
} from '../types/apiTypes'
import { instance } from './index'

class WordAPI {
    static fetchWordsByDictionaryId = (params: { dictionaryId: number }) => {
        return instance.get<getWordsByDictionaryIdType>(
            `/word/dictionary/${params.dictionaryId}?page=1&limit=10`,
            {
                withCredentials: true,
            }
        )
    }
    static createWord = (data: {
        dictionaryId: number
        name: string
        translation: string
    }) => {
        return instance.post<wordType>(
            `/word/dictionary/${data.dictionaryId}`,
            {
                name: data.name,
                translation: data.translation,
            },
            {
                withCredentials: true,
            }
        )
    }

    static updateWord = (data: {
        wordId: number
        name: string
        translation: string
    }) => {
        return instance.patch<wordType>(
            `/word/${data.wordId}`,
            { name: data.name, translation: data.translation },
            {
                withCredentials: true,
            }
        )
    }
    static deleteWord = (wordId: number) => {
        return instance.delete<deleteWordType>(`/word/${wordId}`, {
            withCredentials: true,
        })
    }
}

export default WordAPI
