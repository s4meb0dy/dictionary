import React from 'react';
import DictionaryInformation from '../components/dictionary/DictionaryInformation';
import FullPageWhiteContainer from '../components/pageContainers/FullPageWhiteContainer';
import HeaderUnderFullPage from '../components/pageContainers/HeaderUnderFullPage';

const Dictionary: React.FC = () => {
    return (
        <div className="h-full w-full animate-appearance">
            <HeaderUnderFullPage>
                <DictionaryInformation />
            </HeaderUnderFullPage>
            <FullPageWhiteContainer>
                
            </FullPageWhiteContainer>
        </div>
    );
};

export default Dictionary;