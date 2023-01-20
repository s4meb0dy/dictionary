import { getMyDictionariesType, getDictionariesType } from '../types/apiTypes'
import { instance } from './index'

class DictionaryAPI {
    static fetchMyDictionaries = () => {
        return instance.get<getMyDictionariesType>(`/dictionary`, {
            withCredentials: true,
        })
    }
    static fetchPublicDictionaries = () => {
        return instance.get<getDictionariesType>(`/dictionary/public?page=1&limit=10`, {
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
