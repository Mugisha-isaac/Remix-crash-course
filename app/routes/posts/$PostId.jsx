import {useParams} from 'remix'

function Post() {
    const params = useParams()
  return <div>
      <h1>post {params.PostId}</h1>
  </div>;
}

export default Post;
