import { apiUrl } from './api'
import {
    IGetAllPublicDictionariesResponse,
    IGetWordsFromDictionaryResponse,
    IWordRequest,
    IWord,
    IError,
    IDictionary,
    ICreateDictionaryWithWordsRequest,
} from './../../types/models'
import { transformErrorFromApi } from '../../utils/transforErrorFromApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dictionaryApi = createApi({
    reducerPath: 'dictionaryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers) => {
            headers.set(
                "ngrok-skip-browser-warning",
                "true"
            );
            if (localStorage.getItem('token')) {
                headers.set(
                    'Authorization',
                    `Bearer ${localStorage.getItem('token')}`
                )
            }
            return headers
        },
    }),
    tagTypes: ['MyDictionary', 'MyWord', '1'],
    endpoints: (builder) => ({
        //----------------Dictionary------------------
        getMyDictionaries: builder.query<IDictionary[], void>({
            query: () => ({ url: '/dictionary' }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'MyDictionary' as const,
                              id,
                          })),
                          { type: 'MyDictionary', id: 'LIST' },
                      ]
                    : [{ type: 'MyDictionary', id: 'LIST' }],
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        createDictionary: builder.mutation<
            IDictionary,
            ICreateDictionaryWithWordsRequest
        >({
            query: (body) => {
                console.log(body)
                return {
                    url: '/word/dictionary',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'MyDictionary', id: 'LIST' }],
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        getAllPublicDictionaries: builder.query<
            IGetAllPublicDictionariesResponse,
            { page: number; name: string }
        >({
            query: (data) => ({
                url: `/dictionary/public?page=${data.page}&limit=10${
                    data.name && `&name=${data.name}`
                }`,
            }),
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },

            // keepUnusedDataFor: 5 * 60 * 1000,
        }),
        copyDictionary: builder.mutation<undefined, number>({
            query: (dictionaryId) => ({
                url: `/word/copy/${dictionaryId}`,
                method: 'GET',
            }),
            invalidatesTags: [{ type: 'MyDictionary', id: 'LIST' }],
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        //----------------WORDS------------------
        getWordsFromMyDictionary: builder.query<
            IGetWordsFromDictionaryResponse,
            { page: number; dictionaryId: number | string }
        >({
            query: ({ page, dictionaryId }) => ({
                url: `word/dictionary/${dictionaryId}?page=${page}&limit=10`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.words.map(({ id }) => ({
                              type: 'MyWord' as const,
                              id,
                          })),
                          { type: 'MyWord', id: 'LIST' },
                      ]
                    : [{ type: 'MyWord', id: 'LIST' }],
            // keepUnusedDataFor: 3 * 60 * 1000,
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        getWordsFromPublicDictionary: builder.query<
            IGetWordsFromDictionaryResponse,
            { page: number; dictionaryId: number | string }
        >({
            query: ({ page, dictionaryId }) => ({
                url: `word/public/${dictionaryId}?page=${page}&limit=10`,
            }),
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        createWord: builder.mutation<
            IWord,
            { dictionaryId: number; data: IWordRequest }
        >({
            query: (body) => ({
                url: `word/dictionary/${body.dictionaryId}`,
                method: 'POST',
                body: body.data,
            }),
            invalidatesTags: [
                { type: 'MyWord', id: 'LIST' },
                { type: 'MyDictionary', id: 'LIST' },
            ],
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        updateWord: builder.mutation<
            IWord,
            { wordId: number; data: IWordRequest }
        >({
            query: (body) => ({
                url: `word/${body.wordId}`,
                method: 'PATCH',
                body: body.data,
            }),
            invalidatesTags: [{ type: 'MyWord', id: 'LIST' }],
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
        deleteWord: builder.mutation<IWord, { wordId: number }>({
            query: (body) => ({
                url: `word/${body.wordId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [
                { type: 'MyWord', id: 'LIST' },
                { type: 'MyDictionary', id: 'LIST' },
            ],
            transformErrorResponse: (
                response: {
                    status: number
                    data: IError
                },
                meta,
                arg
            ) => {
                if (response?.data?.message)
                    return transformErrorFromApi(response.data.message)
                else return transformErrorFromApi('Occurred some error')
            },
        }),
    }),
})
