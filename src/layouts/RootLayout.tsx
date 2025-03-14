import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import RootNavbar from "./RootNavbar";
import { IoMenu, IoSearchOutline, IoSunny, IoMoon } from "react-icons/io5";

const RootLayout = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.className === "dark"
  );

  const menuHandler = () => setIsMenuActive((prev) => !prev);

  return (
    <>
      <header className="border-b border-b-border dark:bg-darkBg header dark:border-b-darkBorder">
        <div className="flex gap-x-2.5 max-w-300 mx-auto p-2.5">
          <Link to="/" className="hover:shadow-none">
            <img src={logoUrl} alt="logo" className="h-10 w-25 bg-gray-50" />
          </Link>
          <form
            className="flex flex-1 gap-x-2.5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="flex-1 outline-none bg-bg px-2.5 dark:bg-darkBorder rounded"
              placeholder="검색어를 입력해주세요."
            />
            <button className="bg-theme text-bg text-2xl w-10 dark:text-darkBg">
              <IoSearchOutline />
            </button>
          </form>
          <button
            className="w-10 bg-bg dark:bg-darkBorder"
            onClick={() => {
              document.body.classList.toggle("dark");
              setIsDarkMode((prev) => !prev);
            }}
          >
            {!isDarkMode ? (
              <IoSunny className="text-red-300" />
            ) : (
              <IoMoon className="text-amber-300" />
            )}
          </button>
          <button
            className="text-2xl w-10 bg-bg dark:bg-darkBorder md:hidden"
            onClick={menuHandler}
          >
            <IoMenu />
          </button>
          {isMenuActive && <RootNavbar menuHandler={menuHandler} />}
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default RootLayout;

const logoUrl =
  "data:image/png;base64,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";
