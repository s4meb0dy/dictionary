import { useAppDispatch } from './reduxHooks'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { useEffect } from 'react'
import { openInfoBlock } from '../redux/features/appSlice'

// const useErrorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
//     const dispatch = useAppDispatch()

//     useEffect(() => {
//         if (error) {
//             if ('status' in error) {
//                 const errMsg =
//                     'error' in error ? error.error : JSON.stringify(error.data)
//                 dispatch(
//                     openInfoBlock({
//                         title: 'Error',
//                         text: errMsg,
//                         type: 'error',
//                     })
//                 )
//             }
//         }
//     }, [error])
// }



const useErrorHandler = (error: string) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
            dispatch(
                openInfoBlock({
                    title: 'Error',
                    text: error,
                    type: 'error',
                })
            )
            console.log(error)
        }
    }, [error])
}

export default useErrorHandler
