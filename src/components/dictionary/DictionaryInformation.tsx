import React from 'react'
import ContentLoader from 'react-content-loader'
import { useAppSelector } from '../../hooks/reduxHooks'
import Button from '../Button'
import Tag from '../Tag'

type DictionaryInformationProps = {
    dictionaryName: string
    access: string
}

const DictionaryInformation: React.FC<DictionaryInformationProps> = ({
    dictionaryName,
    access,
}) => {
    const { isLoading, count, learned, idOfWordsToStudy } = useAppSelector(
        (state) => state.word
    )

    const [nameLearnButton, setNameLearnButton] =
        React.useState('Learn all words')

    React.useEffect(() => {
        if (idOfWordsToStudy.length === 0 || idOfWordsToStudy.length === count)
            setNameLearnButton('Learn all words')
        else if (idOfWordsToStudy.length > 0)
            setNameLearnButton(`Learn ${idOfWordsToStudy.length} words`)
    }, [idOfWordsToStudy, count])

    return (
        <>
            {!isLoading ? (
                <>
                    <span className="absolute top-[15px] right-[15px]">
                        {access === 'public' ? (
                            <Tag name="Public" color="#C89600" />
                        ) : (
                            <Tag name="Private" color="#00AEBF" />
                        )}
                    </span>
                    <span className="absolute bottom-[25px] right-[15px]">
                        <Button
                            name={nameLearnButton}
                            size="medium"
                            color="#24B553"
                            hoverColor="#2cd463"
                            activeColor="#1d9745"
                        />
                    </span>
                    <h3 className="text-white tracking-wide backdrop:font-medium text-[40px] pb-[12px] leading-[50px]">
                        {dictionaryName}
                    </h3>
                    <p className="text-white tracking-wide backdrop:text-[20px] leading-[25px]">
                        {`${count} words`}
                    </p>
                    <p className="text-white tracking-wide backdrop:text-[18px] leading-[23px]">
                        {`${learned} studied words`}
                    </p>
                </>
            ) : (
                <ContentLoader
                    speed={2}
                    width={200}
                    height={130}
                    viewBox="0 0 200 110"
                    backgroundColor="#257bc4"
                    foregroundColor="#0D6CBD"
                >
                    <rect x="0" y="83" rx="5" ry="5" width="150" height="17" />
                    <rect x="0" y="0" rx="5" ry="5" width="200" height="40" />
                    <rect x="0" y="58" rx="5" ry="5" width="195" height="19" />
                </ContentLoader>
            )}
        </>
    )
}

export default DictionaryInformation
