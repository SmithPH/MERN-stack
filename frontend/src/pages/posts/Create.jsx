import { useContext, useState } from "react";
import { createPost } from "../../controllers/postsController";
import Alert from "../../Components/Alert";
import { PostContext } from "../../contexts/PostContext"
import { useNavigate } from "react-router-dom"

const Create = () => {
  // Use Post Context
  const {posts,setPosts} = useContext(PostContext)

  // Use navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // create a new post
      const data = await createPost(title, body);
      // update post state
      setPosts([...posts, data.post])
      // navigate to dashboard
      navigate("/dashboard", {state:"Post has been created"})
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handleCreate}>
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
        <button className="btn">Create</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Create;
