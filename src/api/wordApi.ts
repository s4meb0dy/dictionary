import {
    getWordsFromDictionaryResponseType,
    wordType,
    createWordRequestType,
    deleteWordResponseType,
    deleteWordRequestType,
    updateWordRequestType,
    getWordsFromDictionaryRequestType
} from './../types/apiTypes/wordAPITypes'

import { instance } from './index'

class WordAPI {
    static fetchWordsFromDictionary = (
        data: getWordsFromDictionaryRequestType
    ) => {
        return instance.get<getWordsFromDictionaryResponseType>(
            `/word/dictionary/${data.dictionaryId}?page=${data.page}&limit=${data.limit}`,
            {
                withCredentials: true,
            }
        )
    }
    static createWord = (data: createWordRequestType) => {
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
    static updateWord = (data: updateWordRequestType) => {
        return instance.patch<wordType>(
            `/word/${data.wordId}`,
            { name: data.name, translation: data.translation },
            {
                withCredentials: true,
            }
        )
    }
    static deleteWord = (data: deleteWordRequestType) => {
        return instance.delete<deleteWordResponseType>(`/word/${data.wordId}`, {
            withCredentials: true,
        })
    }
}

export default WordAPI
