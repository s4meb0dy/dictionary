import { getMyDictionariesType, getDictionariesType } from '../types/apiTypes'
import { instance } from './index'
export const a = 1

class DictionaryAPI {
    static fetchMyDictionaries = () => {
        return instance.get<getMyDictionariesType>(`/dictionary`, {
            withCredentials: true,
        })
    }
    static fetchPublicDictionaries = () => {
        return instance.get<getDictionariesType>(`/dictionary/public`, {
            withCredentials: true,
        })
    }
    static postDictionary = (data: {
        dictionaryName: string
        isPublic: boolean
        words: Array<{ name: string; translation: string }>
    }) => {
        return instance.post(`/word/dictionary`, data, {
            withCredentials: true,
        })
    }
}

export default DictionaryAPI
