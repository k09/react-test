import { 
    useGetPostsQuery
} from './postsSlice';

const Posts3 = () => {;
    const { data: posts, refetch, isLoadingPosts, isSuccessPosts, isErrorPosts, errorPosts } = useGetPostsQuery();
    const refetchPosts = (e) => {
        e.preventDefault();
        refetch();
    }
    let contentPosts = '';
    if (isLoadingPosts) contentPosts = <div>Loading Posts......</div>
    if (isErrorPosts) contentPosts = <div>Posts Error: {errorPosts}......</div>
    if (isSuccessPosts) { 
        contentPosts = posts.map((post) => { return <li key={post.id}>{post.title} ({post.author}) </li> })
    }
    return (
        <>
            <hr />
            <hr />
            <h3>Posts III</h3>
            <ul>
                {contentPosts}
            </ul>
            <div><button onClick={(e) => refetchPosts(e)}>refetch</button></div>
           <hr />
           <hr /> 
        </>
    )
}
    
export default Posts3;