import { PropsWithChildren } from "react";
import { CgSpinner } from "react-icons/cg";

interface Props extends PropsWithChildren {
  message?: string;
}
const Loading = ({ message, children }: Props) => {
  return (
    <div className="fixed w-full h-screen flex flex-col gap-y-2.5 flex-center">
      {children ?? (
        <>
          <CgSpinner className="text-4xl animate-spin text-theme" />
          <h1 className="animate-pulse">{message ?? "App is Loading..."}</h1>
        </>
      )}
    </div>
  );
};

export default Loading;
