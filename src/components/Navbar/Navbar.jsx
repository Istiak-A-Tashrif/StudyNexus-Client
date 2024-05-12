import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useThemeDetector from "../../Hooks/useThemeDetector";
import { Link } from "react-router-dom";

const navLink = (
  <>
    <li>
      <Link to={"/"}>Home</Link>
    </li>
    <li>
      <Link to={"/allAssignments"}>All Assignments</Link>
    </li>
    <li>
      <details>
        <summary>My Assignments</summary>
        <ul className="p-2 z-20">
          <li>
            <Link to={"/added"}>Added</Link>
          </li>
          <li>
            <Link to={"/submitted"}>Submitted</Link>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <Link to={"/createAssignment"}>Create Assignment</Link>
    </li>
    <li>
      <Link to={"/register"}>Register</Link>
    </li>
  </>
);

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    const themeSettings = localStorage.getItem("themeSettings");
    if (themeSettings === "on") {
      return setSelectedOption("on");
    } else if (themeSettings === "off") {
      return setSelectedOption("off");
    }
    setSelectedOption("system");
  }, []);

  // Function to handle option selection
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const isDarkTheme = useThemeDetector();

  // theme function
  useEffect(() => {
    if (selectedOption === "system") {
      localStorage.setItem("themeSettings", "system");
      if (isDarkTheme) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      const localTheme = localStorage.getItem("theme");
      document.querySelector("html").setAttribute("data-theme", localTheme);
    }

    if (selectedOption === "on") {
      localStorage.setItem("theme", "dark");
      localStorage.setItem("themeSettings", "on");
      document.querySelector("html").setAttribute("data-theme", "dark");
    }
    if (selectedOption === "off") {
      localStorage.setItem("theme", "light");
      localStorage.setItem("themeSettings", "off");
      document.querySelector("html").setAttribute("data-theme", "light");
    }
  }, [selectedOption, isDarkTheme]);
  return (
    <div className="navbar bg-base-100 p-0">
      <div className="navbar-start">
        <div className="dropdown mr-2">
          <div tabIndex={0} role="button" className="lg:hidden px-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLink}
          </ul>
        </div>
        <h1 className="text-2xl font-extrabold font-rowdies text-[#7469B6]">
          Study<span className="text-[#AD88C6]">Nexus</span>
        </h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLink}</ul>
      </div>

      {/* navbar end */}
      <div className="navbar-end">
      <div className="avatar">
  <div className="w-6 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
  </div>
</div>
        <div className="dropdown dropdown-end dropdown-bottom">
          <div tabIndex={0} role="button" className="text-xl">
            <BsThreeDotsVertical />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <details>
                <summary className="p-2">Dark mode</summary>
                <div className="form-control">
                  {/* On option */}
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">On</span>
                    <input
                      type="radio"
                      value="on"
                      checked={selectedOption === "on"}
                      onChange={handleOptionChange}
                      className="radio"
                    />
                  </label>

                  {/* Off option */}
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">Off</span>
                    <input
                      type="radio"
                      value="off"
                      checked={selectedOption === "off"}
                      onChange={handleOptionChange}
                      className="radio"
                    />
                  </label>

                  {/* Use System Settings option */}
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">Use System Settings</span>
                    <input
                      type="radio"
                      value="system"
                      checked={selectedOption === "system"}
                      onChange={handleOptionChange}
                      className="radio"
                    />
                  </label>
                </div>
              </details>
            </li>
            <li className="cursor-pointer p-2"><button>Log out</button></li>
            <li className="cursor-pointer p-2"><Link to={"/login"}>Log in</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
