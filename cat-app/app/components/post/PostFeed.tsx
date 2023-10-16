import getPosts from "@/app/actions/GetPosts"
import PostItems from "./PostItems"

type Props = {
    userId: string;
    currentUser: any
}

async function PostFeed({userId, currentUser}: Props) {
    const posts = await getPosts()
    console.log(posts)
  const FilterPosts = userId ? posts.filter((post) => post.user.id === userId || post.userId === userId) : posts 

  return (
    <div>
        {FilterPosts.map((post) => (
            <PostItems key={post.id}  userId={userId} postData={post} currentUser={currentUser}/>
        ))
        }
    </div>
  )
}

export default PostFeed