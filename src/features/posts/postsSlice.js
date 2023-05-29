import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const initialState = { 
    id: undefined, 
    title: '0', 
    author: ''
  };
  
  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      doSomePosts(state) {
        return undefined;
      }
    }
  });
  
  export const { doSomePosts } = postsSlice.actions;
  export default postsSlice.reducer;
  

export const postsApiSlice = createApi({
  reducerPath: 'postsApi', //All RTK Query cache data will be stored under state.postsApi
  tagTypes: ['Post'],
  //refecthOnMount: true,
  //refetchOnReconnect: true,
  //refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3010' }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      //transformResponse
      //transformErrorResponse
      //pollingInterval: 2000
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
          : ['Post'],
    }),
    insertPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: [{ type: 'Post'}]
    }),
    getPost: builder.query({
        query: id => `/posts/${id}`,
        providesTags: (result, error, id) => [{ type: 'Post', id }]
    }),
    updatePost: builder.mutation({
      query: ({ id, ...post}) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }]
    })
  })
})

export const { 
  useGetPostQuery,
  useGetPostsQuery, 
  useInsertPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApiSlice