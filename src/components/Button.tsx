import { FC, MouseEventHandler } from "react";
interface BtnProps {
  text: string;
  inputType: "button" | "submit";
  onClick?: MouseEventHandler;
}

const Button: FC<BtnProps> = ({ text, inputType, onClick }) => {
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center"
      onClick={onClick}
      type={inputType}
    >
      {text}
    </button>
  );
};

export default Button;
