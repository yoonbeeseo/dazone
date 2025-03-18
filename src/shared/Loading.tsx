import { PropsWithChildren } from "react";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren {
  message?: string;
  className?: string;
  noMessage?: boolean;
}
const Loading = ({ message, children, className, noMessage }: Props) => {
  return (
    <div
      className={twMerge(
        "fixed w-full h-screen flex flex-col gap-y-2.5 flex-center",
        className
      )}
    >
      {children ?? (
        <>
          <CgSpinner className="text-4xl animate-spin text-theme" />
          {noMessage !== true && (
            <h1 className="animate-pulse">{message ?? "App is Loading..."}</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Loading;
