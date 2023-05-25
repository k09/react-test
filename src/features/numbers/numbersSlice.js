import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = { 
  id: undefined, 
  value: 0, 
  text: ''
};

const numbersSlice = createSlice({
  name: 'numbers',
  initialState,
  reducers: {
    doSomeNumbers(state) {
      return undefined;
    }
  }
});

export const { doSomeNumbers } = numbersSlice.actions;
export default numbersSlice.reducer;

export const numbersApiSlice = createApi({
  reducerPath: 'numbersApi', //All RTK Query cache data will be stored under state.numbersApi.
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3010'}),
  tagTypes: ['NUMBERS'],
  //refetchOnFocus: true,
  //refetchOnReconnect: true,
  //refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getNumbers: builder.query({
      query: () => '/numbers',
      providesTags: ['NUMBERS']
    }),
    getNumber: builder.query({
      query: (id) => `/numbers?id=${id}`,
      providesTags: ['NUMBERS']
    }),
    searchNumbers: builder.query
    ({
      query: (search) => `/numbers?search=${search}`,
      providesTags: ['NUMBERS']
    }),
    addNumber: builder.mutation({
      query: (number) => ({
        url: '/numbers',
        method: 'POST',
        body: number
      }),
      invalidatesTags: ['NUMBERS']
    }),
    editNumber: builder.mutation({
      query: ({id, ...number}) => ({
        url: `/numbers/${id}`, 
        method: 'PUT',
        body: number
      }),
      invalidatesTags: ['NUMBERS']
    }),
    deleteNumber: builder.mutation({
      query: (id) => ({
        url: `/numbers/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['NUMBERS']
    })
  })
});

export const { 
  useGetNumbersQuery, 
  useGetNumberQuery,
  useSearchNumbersQuery,
  useAddNumberMutation, 
  useEditNumberMutation, 
  useDeleteNumberMutation 
} = numbersApiSlice;