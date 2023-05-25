import { useParams } from 'react-router-dom';
import { useGetPostQuery, useInsertPostMutation     } from './postsSlice';
import Navigator from '../../app/Navigator';

const Post = () => {
    const params = useParams();
    const id = params.id;
    const { data: post, isLoading: isPostLoading, isSuccess: isPostSuccess, isError: isPostError, error: postError } = useGetPostQuery(id);
    const [insertPost] = useInsertPostMutation();
    let content = '';
    const handleSubmit = (e) => {
        e.preventDefault();
        insertPost(post);
        window.location.url = '/';
    }
    if (isPostLoading) {
        content = <div>Loading post.......</div>
      } else if (isPostSuccess) {
            content = (
                <article>
                    <h2>{post.data}</h2>
                    <form onSubmit={handleSubmit}> 
                        <div>Title: {post.title}</div>
                        <div><input type='text' value={post.title} onChange={(e) => console.log(e.target.value)} /></div>
                        <div>Author: {post.author}</div>
                        <div><input type='text' value={post.author} onChange={(e) => console.log(e.target.value)} /></div>
                        <button type='submit'>insert</button>
                    </form>
                </article>
            )
      } else if (isPostError) {
        content = <div>Error (post): {postError.toString()}</div>
      }
    
    return (
        <>
            <section>
                {content}
                <Navigator title='back' url='/#posts'/>
            </section>
        </>
    )
}
export default Post;
