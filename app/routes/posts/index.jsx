import {useLoaderData,Link} from  'remix';


export const loader = ()=>{
    const data ={
        posts:[
            {id:1, title:'post 1', body:'This is test post'},
            {id:2, title:'post 2', body:'This is successfull post'},
            {id:3, title:'post 3', body:'This is faile post'}
        ]
    }
    return data;
}

function PostItem() {

    const {posts} = useLoaderData();
  return <>
      <div className="page-header">
      <h1>Posts</h1>
      <Link to='/posts/new' className='btn'>
          New post
      </Link>
      </div>
      <ul className="posts-list">
      {posts.map(post=>(
          <li key={post.id}>
              <Link to={post.id}>
                   <h3>{post.title}</h3>
              </Link>
          </li>
      ))}
      </ul>
     
  </>;
}

export default PostItem;
