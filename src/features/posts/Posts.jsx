import { useState } from 'react';
import { useGetPostsQuery, useUpdatePostMutation } from './postsSlice';
import { Link } from 'react-router-dom';

const Posts = () => {
  const {
    data: posts, 
    //currentData: currentPosts,
    refetch: refetchPosts, 
    isLoading: isPostsLoading, 
    isFetching: isPostsFetching,
    isSuccess: isPostsSuccess, 
    isError: isPostsError, 
    error: postsError 
  } = useGetPostsQuery(undefined, {
      pollingInterval: 20000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      skip: false,
      //selectFromResult: (data) => ({
        //post: data?.find((post) => post.author === 'Kristján Kristmannsson')
      //})
  });
  const [ updatePost] = useUpdatePostMutation();
  //const [ insertPost] = useInsertPostMutation().unwrap().then((payload) => console.log('fulfilled', payload)).catch((error) => console.error('rejected', error));
  const [selectedPost, setSelectedPost] = useState(null);
  //const [ fetchTime, setFetchTime] = useState(null);
  //const [ loadTime, setLoadTime] = useState(null);
  const handleSelect = (e,post) => {
    e.preventDefault();
    setSelectedPost(post);
  }
  
  let content = '';
  if (isPostsLoading && posts) {
    content = <div>Loading posts.......</div>;
    //setLoadTime(new Date());
  } else if (isPostsFetching) {
    //setFetchTime(new Date());
  } else if (posts && posts.length === 0) {
    content = <div>Zero Posts.......</div>
  } else if (isPostsSuccess) {
    content = posts.map((post) => {
        return <li key={post.id}>
            <Link to={`/post/${post.id}`} className="button">open</Link>&nbsp;
            <button onClick={(e) => handleSelect(e,post)}>select</button>&nbsp;
            {post.title} ({post.author}) {isPostsFetching ? '.........refetching' : ''}
        </li>
    });
  } else if (isPostsError) {
    content = <div>Error (posts): {postsError.toString()}</div>
  }
  const selectedPostId = selectedPost !== null ? selectedPost.id : '';
  let selectedPostTitle = selectedPost !== null ? selectedPost.title : '';
  let selectedPostAuthor = selectedPost !== null ? selectedPost.author : '';
  return (
    <div>
        <h2 id='posts'>Posts</h2>
        <button onClick={refetchPosts} disabled={!posts}>refetch</button>
        <ul className={isPostsFetching ? 'posts-disabled' : ''} style={{minHeight:'256px',maxWidth:'512px',backgroundColor:'lightgray'}}>
            {content}
        </ul>
        Id: {selectedPostId}<br/>
        Title: <input type='text' value={selectedPostTitle} onChange={(e) => selectedPostTitle = e.target.value} /><br/>
        Author: <input type='text' value={selectedPostAuthor} onChange={(e) => selectedPostAuthor = e.target.value} /><br/>
        <button 
          onClick={() => setSelectedPost(null)}
        >clear
        </button>
        <button 
          onClick={() => updatePost( 
            selectedPostId, 
            { id: selectedPostId, title: selectedPostTitle, author: selectedPostAuthor }
          )}
        >update
        </button>
    </div>
  )
}
export default Posts;