import { AnimatePresence, motion, Variants } from 'framer-motion'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setError } from '../../../redux/features'
import Button from '../../input/Button'
import TextInput from '../../input/TextInput'

interface IterationProps {
    name: string
    answer: string
    id: number
    isVisible: boolean
    variants: Variants
    goToNextStep: () => void
}

const Iteration: React.FC<IterationProps> = ({
    isVisible,
    name,
    answer,
    id,
    variants,
    goToNextStep,
}) => {
    const dispatch = useAppDispatch()

    const secondaryColor = useAppSelector(
        (state) => state.app.colors.secondaryColor
    )

    const [value, setValue] = React.useState('')
    const [isError, setErrorStyle] = React.useState<boolean>(false)
    const [isSuccess, setSuccessStyle] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (isVisible) {
            setErrorStyle(false)
            setSuccessStyle(false)
        }
    }, [isVisible])

    const onAnswerBtnHandler = () => {
        if (value === answer) {
            setSuccessStyle(true)
            goToNextStep()
        } else {
            setErrorStyle(true)
            dispatch(setError(id))
        }
    }

    const onChangeValue = (e: React.ChangeEvent<any>) => {
        setValue(e.target.value)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                        backgroundColor: secondaryColor,
                        borderColor: isError
                            ? '#FE2836'
                            : secondaryColor,
                    }}
                    className={`w-[550px] rounded-[25px] p-[30px] border-2 transition-all`}
                >
                    <h3 className="text-[55px] font-[500] tracking-tight text-center pb-[30px]">
                        {name}
                    </h3>
                    <div className="flex items-center">
                        <TextInput
                            width="100%"
                            size="large"
                            value={value}
                            onChange={onChangeValue}
                            name="inputTranslate"
                            placeholder="Translation"
                        />
                        <Button
                            size="large"
                            styles="ml-[20px]"
                            hoverColor="#53A0FF"
                            activeColor="#0D6CBD"
                            onClick={onAnswerBtnHandler}
                        >
                            Answer
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Iteration
