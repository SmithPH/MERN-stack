import { useContext, useState } from "react";
import Alert from "../../Components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePost } from "../../controllers/postsController";

const Update = () => {
  // Use Post Context (global state)
  const { posts, setPosts } = useContext(PostContext);

  // Use navigate hook
  const navigate = useNavigate();

  // to get data from dashboard (which post we want to update)
  // use location to see what object we will get and destructure them to pick only we need
  //   const location = useLocation();
  //   console.log(location);
  // in this case, we use state (state)
  const { state } = useLocation();
  // console.log(state);

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // update post
      const data = await updatePost(state._id, title, body);
      // Exclude the old version of updated post from post context
      // So that there is no duplication of post with same _id
      const updatedPosts = posts.filter((post) => post._id !== state._id);
      // Update the posts state
      setPosts([...updatedPosts, data.post]);
      // navigate to dashboard
      navigate("/dashboard", { state: "Post has been updated" });
      // console.log("upda",updatedPosts)
      // console.log("data", data.post)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Update your post</h1>
      <p>{state._id}</p>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Post Title"
          className="input"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="6"
          placeholder="Post Content"
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button className="btn">Update</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Update;
