import { useState, useEffect, useRef, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import RootNavbar from "./RootNavbar";
import {
  IoMenu,
  IoSearchOutline,
  IoSunny,
  IoMoon,
  IoBasketOutline,
} from "react-icons/io5";
import { AUTH, CART } from "../contextApi";
import { twMerge } from "tailwind-merge";
import { TextInput, TextInputRef } from "../ui";
import { logoUrl } from "../lib/dummy";

const RootLayout = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.className === "dark"
  );

  const menuHandler = () => setIsMenuActive(false);

  const { user } = AUTH.use();
  const { cart } = CART.use();

  const navi = useNavigate();

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const getScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", getScroll);

    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  }, []);

  const [keyword, setKeyword] = useState("");
  const keywordRef = useRef<TextInputRef>(null);

  const onSubmitKeyword = useCallback(() => {
    if (keyword.length === 0) {
      alert("검색어를 입력해주세요.");
      return keywordRef.current?.focus();
    }

    setKeyword("");
    navi(`/product?keyword=${keyword}`);
  }, [keyword, navi]);

  return (
    <>
      <header
        className={twMerge(
          "border-b border-b-border dark:bg-darkBg header dark:border-b-darkBorder bg-white",
          scroll >= 100 && "fixed top-0 left-0 w-full z-10"
        )}
      >
        <div className="flex gap-x-2.5 max-w-300 mx-auto p-2.5">
          <Link to="/" className="hover:shadow-none">
            <img
              src={logoUrl}
              alt="logo"
              className="h-10 w-25 bg-gray-50 object-cover"
            />
          </Link>
          <form
            className="flex flex-1 gap-x-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitKeyword();
            }}
          >
            <div className="flex-1">
              <TextInput
                placeholder="검색어를 입력해주세요."
                id="keyword"
                onChangeText={setKeyword}
                ref={keywordRef}
                value={keyword}
              />
            </div>
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

          {user && (
            <button
              className="text-2xl w-10 bg-bg dark:bg-darkBorder md:hidden relative"
              onClick={() => navi("/cart")}
            >
              <IoBasketOutline />
              {cart.length > 0 && (
                <span className="absolute top-[-4px] right-[-4px] rounded-full bg-red-500 text-white text-xs w-4 h-4">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          <button
            className="text-2xl w-10 bg-bg dark:bg-darkBorder md:hidden"
            onClick={() => setIsMenuActive(true)}
          >
            <IoMenu />
          </button>
          {isMenuActive && <RootNavbar menuHandler={menuHandler} />}
          <div className="hidden md:block">
            <RootNavbar menuHandler={menuHandler} />
          </div>
        </div>
      </header>
      {scroll >= 100 && (
        <button
          className="btn rounded-sm fixed bottom-2.5 right-2.5 z-10"
          // style={{
          //   borderRadius: 4,
          // }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Top
        </button>
      )}
      <main className="max-w-300 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
