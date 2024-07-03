import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../Components/Post";

const Home = () => {
  // Use post context
  const { posts, setPosts } = useContext(PostContext);

  // loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // to use async in useEffect -> (async ...)()
    (async () => {
      // grab all posts
      const data = await getPosts();
      //update posts state
      setPosts(data.posts);
      //remove loading
      setLoading(false)
    })();
  }, []); // put [] here to make it run only once

  console.log("posts", posts);
  return (
    <section className="card">
      <h1 className="title">Latest posts</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {posts && 
        posts.map((post)=> (
          <div key={post._id}> id= {post._id}
          
          <Post post={post}/>
      </div>
      ))}
    </section>
  );
};
export default Home;
