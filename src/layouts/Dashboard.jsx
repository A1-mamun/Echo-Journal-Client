import { Link, NavLink, Outlet } from "react-router-dom";
import Container from "../components/shared/Container";
import {
  MdArticle,
  MdClose,
  MdDashboard,
  MdWorkspacePremium,
} from "react-icons/md";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import useAuth from "../Hooks/useAuth";
import { PiArticleMedium } from "react-icons/pi";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Dashboard = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navlinks = (
    <>
      {/* Home */}
      <li className="bg-gray-50">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <MdDashboard size={18} className="text-black " />
          Dashboard
        </NavLink>
      </li>
      <li className="bg-gray-50">
        <NavLink
          to="/dashboard/all-users"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <FaUsers size={18} className="text-black " />
          All Users
        </NavLink>
      </li>
      <li className="bg-gray-50">
        <NavLink
          to="/dashboard/all-articles"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <MdArticle size={18} className="text-black " />
          All Articles
        </NavLink>
      </li>
      <li className="bg-gray-50">
        <NavLink
          to="/dashboard/add-publisher"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <IoMdAddCircleOutline size={18} className="text-black " />
          Add Publisher
        </NavLink>
      </li>
    </>
  );

  const navlinksAll = (
    <>
      {/* Home */}
      <li className="bg-gray-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <FaHome size={18} className="text-black " />
          Home
        </NavLink>
      </li>
      {/* All articles */}
      <li className="bg-gray-50">
        <NavLink
          to="/all-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <MdArticle size={18} className="text-black " />
          All Article
        </NavLink>
      </li>
      {/* Premium Articles */}
      <li className="bg-gray-50">
        <NavLink
          to="/premium-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <MdWorkspacePremium size={18} className="text-black " />
          Premium Articles
        </NavLink>
      </li>

      {/* My Articles */}
      <li className="bg-gray-50">
        <NavLink
          to="/my-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <PiArticleMedium size={18} className="text-black " />
          My Articles
        </NavLink>
      </li>

      {/*  Add Articles */}
      <li className="bg-gray-50">
        <NavLink
          to="/add-article"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold border border-primary rounded-md flex items-center p-2 space-x-3 gap-3"
              : " flex items-center p-2 space-x-3 rounded-md gap-3"
          }
        >
          <IoMdAddCircle size={18} className="text-black " />
          Add Articles
        </NavLink>
      </li>
    </>
  );
  return (
    <Container>
      <div className="lg:hidden md:mr-3 lg:mr-5 text-sm md:text-base mt-5">
        {isOpen ? (
          <MdClose onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <AiOutlineMenu onClick={() => setIsOpen(!isOpen)} />
        )}
        <div className="absolute z-50">
          <div
            className={`relative h-full transition-transform duration-300 transform ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full -left-24 "
            }`}
          >
            <div className=" min-h-screen p-3 space-y-2 w-60 bg-gray-200 text-gray-800">
              <div className="flex items-center p-2 space-x-4">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-12 h-12 rounded-full dark:bg-gray-500"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                  <Link to="/profile" className="flex items-center space-x-1">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs hover:underline dark:text-gray-600"
                    >
                      View profile
                    </a>
                  </Link>
                </div>
              </div>
              <div className="divide-y dark:divide-gray-300">
                <ul className="pt-2 pb-4 space-y-2 text-sm">{navlinks}</ul>
                <ul className="pt-4 pb-2 space-y-2 text-sm">{navlinksAll}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-10">
        <div className="hidden lg:block">
          <div className=" min-h-screen p-3 space-y-2 w-60 bg-gray-200 text-gray-800">
            <div className="flex items-center p-2 space-x-4">
              <img
                src={user?.photoURL}
                alt="profile"
                className="w-12 h-12 rounded-full dark:bg-gray-500"
              />
              <div>
                <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                <Link to="/profile" className="flex items-center space-x-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline dark:text-gray-600"
                  >
                    View profile
                  </a>
                </Link>
              </div>
            </div>
            <div className="divide-y dark:divide-gray-300">
              <ul className="pt-2 pb-4 space-y-2 text-sm">{navlinks}</ul>
              <ul className="pt-4 pb-2 space-y-2 text-sm">{navlinksAll}</ul>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-5 z-0">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
