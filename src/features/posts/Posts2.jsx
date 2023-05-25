import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useGetPostsQuery, useInsertPostMutation } from './postsSlice';
import Post from './Post';

const InsertPost = () => {
    const initialValue = { id: '', title: '', author: '' }
    const [post, setPost] = useState(initialValue)
    const [insertPost] = useInsertPostMutation()
    const handleChangeTitle = ({ target }) => {
      setPost((prev) => ({
        ...prev,
        [target.name]: target.value,
      }))
    }
  
    const handleInsertPost = async () => {
      try {
        await insertPost(post).unwrap()
        setPost(initialValue)
      } catch {
        console.log({ title: 'An error occurred', description: "We couldn't save your post, try again!" });
      }
    }
  
    return (
        <>
            <span>Title: </span>
            <input value={post && post.title} onChange={handleChangeTitle} />
            <button onClick={handleInsertPost}>Insert Post</button>
        </>
    )
}

const Posts2 = () => {
    const { data: posts, isLoading } = useGetPostsQuery()
    const navigate = useNavigate()
    if (isLoading) { return <div>Loading</div> }
    if (!posts) { return <div>No posts :(</div> }
    return (
      <ul>
        {posts.map(({ post }) => (
          <li key={post && post.id} onClick={() => navigate(`/posts/${post && post.id}`)}>
            {post && post.title} {post && post.author} {post && post.id}
          </li>
        ))}
      </ul>
    )
  }
  
  export const PostsStatistics = () => {
    const { data: posts } = useGetPostsQuery()
    if (!posts) return null
    return (
      <>
        <div>Active Posts</div>
        <div>{posts?.length}</div>
      </>
    )
  }
  
  export const PostsManager = () => {
    return (
      <>
        <h3>Manage Posts</h3>
        <PostsStatistics />
        <hr />
        <InsertPost />
        <hr />
        <div>
            <h4>Posts</h4>
            <Posts2 />
        </div>    
        <div>
            <Routes>
              <Route path="/posts/:id" element={<Post />} />
              <Route element={ <h4>Select a post to edit!</h4> } />
            </Routes>
        </div>
      </>
    )
  }

export default Posts2