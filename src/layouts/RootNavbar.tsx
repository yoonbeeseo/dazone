import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useMemo } from "react";
import { AUTH } from "../contextApi/context";

interface Props {
  menuHandler: () => void;
}

interface Menu {
  to?: string;
  name: string;
}

const RootNavbar = ({ menuHandler }: Props) => {
  const { user, signout } = AUTH.use();
  const menus: Menu[] = useMemo(() => {
    const items: Menu[] = [
      { to: "/", name: "홈" },
      { to: "/product", name: "상품보기" },
      { to: "/myAccount", name: "나의정보" },
    ];

    if (user) {
      items.push(
        { to: "/cart", name: "장바구니" },
        { name: "주문내역", to: "orders" },
        { name: "로그아웃" }
      );
    }

    return items;
  }, [user]);
  const location = useLocation();

  return (
    <nav className="fixed bg-white top-15 right-0 w-full z-10 border border-border border-l-0 border-r-0 dark:bg-darkBg dark:border-darkBorder md:relative md:flex md:w-auto md:top-0">
      {menus.map(({ name, to }) => {
        const isCurrentPath = to === location.pathname;

        const onClick = () => {
          menuHandler();
          if (name === "로그아웃") {
            signout();
          }
        };

        return (
          <Link
            to={
              name === "로그아웃"
                ? location.pathname === "/myAccount"
                  ? "/"
                  : to!
                : to!
            }
            key={name}
            onClick={onClick}
            className={twMerge(
              "hover:shadow-none hover:bg-bg hover:text-theme dark:hover:bg-darkBorder rounded-none",
              isCurrentPath && "text-theme",
              (name === "홈" || name === "상품보기") && "md:hidden"
            )}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default RootNavbar;
