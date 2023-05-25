import React, {Profiler} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Post from './features/posts/Post';
import PageNotFound from './app/PageNotFound';
import { store } from './app/store';
import { Provider } from 'react-redux';
//<ApiProvider /> can be used as a <Provider /> if you <strong>if you do not already have a redux store</strong>
//import { ApiProvider } from '@reduxjs/toolkit/query/react';
//import { numbersApiSlice } from './features/numbers/numbersSlice';
//import { postsApiSlice } from './features/posts/postsSlice';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const app = 'App';

const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  //!console.log(`on render: id: ${id}`);
  //!console.log(`on render: phase: ${phase}`);
  //!console.log(`on render: actualDuration: ${actualDuration}`);
  //!console.log(`on render: baseDuration: ${baseDuration}`);
  //!console.log(`on render: startTime: ${startTime}`);
  //!console.log(`on render: commitTime: ${commitTime}`);
}

const router = createBrowserRouter([
  { path: "/", component: {App}, element: <App /> },    
  { path: "/post/:id", component:{Post}, element: <Post /> },    
  { path: "*", component: {PageNotFound},  element: <PageNotFound /> },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Profiler id={app} onRender={onRender}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
    </Profiler>
  </React.StrictMode>
);