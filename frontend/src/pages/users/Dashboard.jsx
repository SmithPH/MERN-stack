import { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postsController";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../Components/Post";
import { Link, useLocation } from "react-router-dom";
import Alert from "../../Components/Alert";
import Success from "../../Components/Success";

const Dashboard = () => {
  // Use user context
  const { user, setUser } = useContext(UserContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // Success State
  const [success, setSuccess] = useState(null);

  // to get data from previous page (navigate, {state})
  const { state } = useLocation();
  // console.log(state);

  useEffect(() => {
    (async () => {
      // grab user's posts
      const { userPosts, email } = await getUserPosts();
      // update user state
      setUser({ email, posts: userPosts });
      // remove the loading
      setLoading(false);
    })();
  }, []);

  // handle delete post
  const handleDelete = async (_id) => {
    if (confirm("Confirm delete?")) {
      try {
        // delete post
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      // to update instantly after deleted (no need to refresh)
      const newPosts = user.posts.filter((post) => post._id !== _id);
      setUser({ ...user, posts: newPosts });
    }
  };
  return (
    <section className="card">
      <h1 className="title">Dashboard</h1>
      <p>{user.email}</p> <br />
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}
      {/* show success after deleted */}
      {success && <Success msg={success} />}
      {/* show success after create and update post */}
      {state && <Success msg={state} />}
      {/* show error message */}
      {error && <Alert msg={error} />}
      {/* show content */}
      {user.posts &&
        user.posts.map((post) => (
          <div key={post._id}>
            <Post post={post}>
              <div className="flex items-center gap-2">
                <Link
                  className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                  title="Update"
                  to="/update"
                  // to send data to Update.jsx
                  state={post}
                ></Link>
                <button
                  className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                  title="Delete"
                  onClick={() => handleDelete(post._id)}
                ></button>
              </div>
            </Post>
          </div>
        ))}
    </section>
  );
};

export default Dashboard;
