
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Button from '../../input/Button'

interface LearnWordsBtnProps {}

const LearnWordsBtn: React.FC<LearnWordsBtnProps> = ({}) => {
    const wordsToStudy = useAppSelector((state) => state.study.wordsToStudy)

    const navigate = useNavigate()

    const [nameOfLearnBtn, setNameOfLearnBtn] = React.useState('')

    React.useEffect(() => {
        if (wordsToStudy.length != 0) {
            setNameOfLearnBtn(`Learn ${wordsToStudy.length} words`)
        } else {
            setNameOfLearnBtn('')
        }
    }, [wordsToStudy])

    const onClickLearnWordsHandler = () => {
        navigate(`/learn`)
    }

    return (
        <>
            {nameOfLearnBtn ? (
                <Button
                    color="#1D9745"
                    hoverColor="#24b553"
                    activeColor="#157b2f"
                    styles="ml-[15px]"
                    onClick={onClickLearnWordsHandler}
                >
                    {nameOfLearnBtn}
                </Button>
            ) : (
                <></>
            )}
        </>
    )
}

export default LearnWordsBtn
