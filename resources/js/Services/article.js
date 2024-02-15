import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/articles/' }),
        endpoints: (builder) => ({
            getArticleById: builder.query({
                query: (id) => `edit/${id}`,
            }),
        }),
    });

export const { useGetArticleByIdQuery } = articleApi;
