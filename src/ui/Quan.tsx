import React, { useMemo } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import Loading from "../shared/Loading";

interface Props {
  quan: number;
  onChange: PropsFunc<number>;
  isPending?: boolean;
}
const Quan = ({ onChange, quan, isPending }: Props) => {
  const btn = "w-8 h-8 hover:shadow-none hover:bg-white dark:hover:bg-darkBg";
  const initialQuan = useMemo(() => quan, []);

  return (
    <div className="flex">
      <button
        className={twMerge(btn, "hover:text-warning")}
        type="button"
        onClick={() => onChange(quan - 1)}
      >
        <AiOutlineMinusCircle />
      </button>
      <button
        className={twMerge(btn, "relative")}
        type="button"
        onClick={() => onChange(initialQuan)}
      >
        {isPending && <Loading noMessage className="absolute h-full" />}
        {quan}
      </button>
      <button
        className={twMerge(btn, "hover:text-theme")}
        type="button"
        onClick={() => onChange(quan + 1)}
      >
        <AiOutlinePlusCircle />
      </button>
    </div>
  );
};

export default Quan;
