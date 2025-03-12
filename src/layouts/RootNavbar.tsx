import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  menuHandler: () => void;
}

interface Menu {
  to: string;
  name: string;
}

const RootNavbar = ({ menuHandler }: Props) => {
  const menus: Menu[] = [
    { to: "/", name: "Home" },
    { to: "/cart", name: "Cart" },
    { to: "/product", name: "Product" },
    { to: "/myAccount", name: "MyAccount" },
  ];

  const location = useLocation();

  return (
    <nav className="fixed bg-white top-15 right-0 w-full z-10 border border-border border-l-0 border-r-0 dark:bg-darkBg dark:border-darkBorder md:relative md:flex md:w-auto md:top-0">
      {menus.map(({ name, to }) => {
        const isCurrentPath = to === location.pathname;
        return (
          <Link
            to={to}
            key={name}
            onClick={menuHandler}
            className={twMerge(
              "hover:shadow-none hover:bg-bg hover:text-theme dark:hover:bg-darkBorder rounded-none",
              isCurrentPath && "text-theme"
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
