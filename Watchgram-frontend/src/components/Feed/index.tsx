import type { PostType } from "../../types/post"
import Post from "../Post"
import './Feed.css'

const Feed = ({ listaPosts, onPostClick, mostrarHeader = true }: { listaPosts: PostType[], onPostClick: (post: PostType) => void, mostrarHeader?: boolean }) => {
  return (
    <div className="feed">
      {listaPosts.map((post, i) => (
        <div key={i} className="post-wrapper" onClick={() => onPostClick(post)}>
          <Post post={post} mostrarHeader={mostrarHeader} />
        </div>
      ))}
    </div>
  )
}

export default Feed