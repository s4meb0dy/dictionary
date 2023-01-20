import { getWordsByDictionaryIdType } from '../types/apiTypes'
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
}

export default WordAPI
