import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface Props {
  state: boolean;
  onClick: Func;
}
const CheckBox = ({ state, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-theme hover:shadow-none"
    >
      {state ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
    </button>
  );
};

export default CheckBox;
