import React from 'react'
import { useParams } from 'react-router-dom'
import DictionaryInformation from '../components/dictionary/DictionaryInformation'
import Words from '../components/dictionary/Words'
import FullPageWhiteContainer from '../components/pageContainers/FullPageWhiteContainer'
import HeaderUnderFullPage from '../components/pageContainers/HeaderUnderFullPage'

const Dictionary: React.FC = () => {
    const { id, name, access } = useParams()

    return (
        <div className="h-full w-full animate-appearance">
            <HeaderUnderFullPage>
                {id && name && access && <DictionaryInformation dictionaryName={name} access={access} />}
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                {id && <Words dictionaryId={Number(id)} />}
            </FullPageWhiteContainer>
        </div>
    )
}

export default Dictionary
