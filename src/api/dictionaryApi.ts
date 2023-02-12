import {
    getMyDictionariesResponseType,
    getAllPublicDictionariesResponseType,
    createDictionaryResponseType,
    createDictionaryRequestType,
    getAllPublicDictionariesRequestType,
} from './../types/apiTypes/dictionaryAPITypes'
import { instance } from './index'

class DictionaryAPI {
    static fetchMyDictionaries = () => {
        return instance.get<getMyDictionariesResponseType>(`/dictionary`, {
            withCredentials: true,
        })
    }
    static fetchPublicDictionaries = (
        data: getAllPublicDictionariesRequestType
    ) => {
        return instance.get<getAllPublicDictionariesResponseType>(
            `/dictionary/public?page=${data.page}&limit=${data.limit}`,
            {
                withCredentials: true,
            }
        )
    }
    static createDictionary = (data: createDictionaryRequestType) => {
        return instance.post<createDictionaryResponseType>(
            `/word/dictionary`,
            data,
            {
                withCredentials: true,
            }
        )
    }
}

export default DictionaryAPI
