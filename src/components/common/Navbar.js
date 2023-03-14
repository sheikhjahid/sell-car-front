import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthUser, signout } from "../../store/slices/authSlice";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getAuthUser);

  const logout = async () => {
    await dispatch(signout());
    navigate("/signin");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <h3>Sell Car</h3>
          {user && (
            <>
              <ul className="navbar-nav ml-4 mr-auto mt-2 mt-lg-0">
                {user.role === "admin" && (
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                )}

                <NavLink className="nav-link" to="reports">
                  Reports
                </NavLink>
              </ul>
              <div className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user?.picUrl ? (
                    <img
                      alt="profile-pic"
                      src={`http://localhost:3001/${user.picUrl}`}
                      height="50"
                      width="50"
                      style={{ borderRadius: "20px" }}
                    ></img>
                  ) : (
                    <img
                      alt="profile-pic"
                      src="no-profile.png"
                      height="50"
                      width="50"
                      style={{ borderRadius: "20px" }}
                    ></img>
                  )}{" "}
                  {user.name}
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="users/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" onClick={logout}>
                    Logout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
