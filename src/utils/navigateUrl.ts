import { NavigationEnum } from '../types/navigation'

const spliceString = (str: string, oldPart: string, newPart: string) => {
    const startIndex: number = str.indexOf(oldPart)
    const endIndex: number = startIndex + oldPart.length
    return str.slice(0, startIndex) + newPart + str.slice(endIndex)
}

export const getMyDictionaryUrl = (params: {
    id: number
    access: 'public' | 'private'
    dictionaryName: string
}) => {
    let url = String(NavigationEnum.myDictionary)

    url = spliceString(url, ':access', params.access)
    url = spliceString(url, ':id', String(params.id))
    url = spliceString(url, ':name', params.dictionaryName)

    return url
}

export const getPublicDictionaryUrl = (params: {
    id: number
    dictionaryName: string
}) => {
    let url = String(NavigationEnum.publicDictionary)
    url = spliceString(url, ':id', String(params.id))
    url = spliceString(url, ':name', params.dictionaryName)
    return url
}

export const getMyDictionariesUrl = () => {
    return NavigationEnum.myDictionaries
}

export const getCreateDictionaryUrl = () => {
    return NavigationEnum.createDictionary
}

export const getPublicDictionariesUrl = () => {
    return NavigationEnum.publicDictionaries
}

export const getStudyUrl = () => {
    return NavigationEnum.study
}
