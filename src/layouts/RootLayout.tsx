import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
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
          <img src="" alt="logo" className="h-10 w-25 bg-gray-50" />
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
