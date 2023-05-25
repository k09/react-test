import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import numbersReducer, { numbersApiSlice } from '../features/numbers/numbersSlice';
import selectorsReducer from '../features/selectors/selectorsSlice';
import postsReducer, { postsApiSlice } from '../features/posts/postsSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    numbers: numbersReducer,
    selectors: selectorsReducer,
    [numbersApiSlice.reducerPath]: numbersApiSlice.reducer,
    posts: postsReducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer
  },
   // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    let result = getDefaultMiddleware();
    result = result.concat(numbersApiSlice.middleware);
    result = result.concat(postsApiSlice.middleware)
    return result;
  }
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);