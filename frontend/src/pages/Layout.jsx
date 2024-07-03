import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    if (confirm("Confirm  Logout")) {
      setUser({ email: null, posts: [] });
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  // console.log(user);
  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4">
          <div>
            <Link
              title="Home" // tooltip
              to="/"
              className="fa-solid fa-house-chimney nav-link"
            ></Link>
          </div>

          {/* we use user.email to check if a user is login */}
          {/* if email is exists, user is logged in */}
          {user.email ? (
            <div className="flex item-center gap-4">
              <Link
                title="Create Post" // tooltip
                to="/create"
                className="fa-solid fa-circle-plus nav-link"
              ></Link>
              <Link
                title="Dashboard" // tooltip
                to="/dashboard"
                className="fa-solid fa-circle-user nav-link"
              ></Link>
              <button
                title="Logout"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex item-center gap-4">
              <Link
                title="Login" // tooltip
                to="/login"
                className="fa-solid fa-right-to-bracket nav-link"
              ></Link>
              <Link
                title="Register" // tooltip
                to="/register"
                className="fa-solid fa-user-plus nav-link"
              ></Link>
            </div>
          )}
        </nav>
      </header>

      <main className="p-4">
        {/* Use <Outlet /> to show the pages and components in the main */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
