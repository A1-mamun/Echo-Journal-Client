import { useState } from "react";
import Container from "../Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../../Hooks/useAuth";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import useRole from "../../../Hooks/useRole";
import usePremiumUser from "../../../Hooks/usePremiumUser";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [role] = useRole();
  const [premium] = usePremiumUser();
  console.log(premium);

  const navlinks = (
    <>
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold border border-primary rounded-md p-1"
            : "p-1"
        }
      >
        Home
      </NavLink>

      {/* All articles */}
      <NavLink
        to="/all-article"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold border border-primary rounded-md p-1"
            : "p-1 "
        }
      >
        All Article
      </NavLink>

      {/* Premium Articles */}
      {(premium === "yes" || role === "admin") && user && (
        <NavLink
          to="/premium-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md p-1"
              : "p-1 "
          }
        >
          Premium Articles
        </NavLink>
      )}

      {/* My Articles */}
      {user && (
        <NavLink
          to="/my-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md p-1"
              : "p-1 "
          }
        >
          My Articles
        </NavLink>
      )}

      {/*  Add Articles */}
      {user && (
        <NavLink
          to="/add-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md p-1"
              : "p-1 "
          }
        >
          Add Articles
        </NavLink>
      )}

      {/* Subscription */}
      {user && (
        <NavLink
          to="/subscribe"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md p-1"
              : "p-1 "
          }
        >
          Subscription
        </NavLink>
      )}

      {/* Dashboard */}
      {role === "admin" && user && (
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md p-1"
              : "p-1 "
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  const handleSignOut = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <Container>
        <div className="navbar">
          {/* Navbar start */}
          <div className="navbar-start">
            <div className="lg:hidden mr-2 md:mr-3 lg:mr-5 text-sm md:text-base">
              {isOpen ? (
                <MdClose onClick={() => setIsOpen(!isOpen)} />
              ) : (
                <AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />
              )}
              <div className="absolute">
                <div
                  className={`relative h-full transition-transform duration-300 transform ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full -left-24 "
                  }`}
                >
                  <ul className=" menu menu-sm dropdown-content duration-1000 mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                    {navlinks}
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              EchoJournal
            </h2>
          </div>

          {/* Navbar center */}
          <div className=" navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 ">{navlinks}</ul>
          </div>

          {/* Navbar end */}
          <div className=" navbar-end gap-3">
            <Link to="/profile">
              <button>
                {user &&
                  (user.photoURL ? (
                    <img
                      className="rounded-full h-7 w-7 md:h-10 md:w-10"
                      alt="profile"
                      src={user.photoURL}
                    />
                  ) : (
                    <RxAvatar className="text-2xl md:text-3xl lg:text-4xl"></RxAvatar>
                  ))}
              </button>
            </Link>

            {user ? (
              <button
                onClick={handleSignOut}
                className="btn btn-sm md:btn-md btn-primary"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button
                    // onClick={handleSignOut}
                    className="btn btn-sm md:btn-md btn-primary"
                  >
                    LogIn
                  </button>
                </Link>

                <Link to="/register">
                  <button className="btn btn-sm md:btn-md btn-primary">
                    SignUp
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
