import { getMyDictionariesType, getDictionariesType, createDictionaryType } from '../types/apiTypes'
import { instance } from './index'

class DictionaryAPI {
    static fetchMyDictionaries = () => {
        return instance.get<getMyDictionariesType>(`/dictionary`, {
            withCredentials: true,
        })
    }
    static fetchPublicDictionaries = (page: number, limit: number) => {
        return instance.get<getDictionariesType>(
            `/dictionary/public?page=${page}&limit=${limit}`,
            {
                withCredentials: true,
            }
        )
    }
    static createDictionary = (data: {
        dictionaryName: string
        isPublic: boolean
        words: Array<{ name: string; translation: string }>
    }) => {
        return instance.post<createDictionaryType>(`/word/dictionary`, data, {
            withCredentials: true,
        })
    }
}

export default DictionaryAPI
