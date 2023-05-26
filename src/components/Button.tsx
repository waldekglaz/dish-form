import { FC, MouseEventHandler } from "react";
interface BtnProps {
  text: string;
  inputType: "button";
  className: string;
  onClick: MouseEventHandler;
}

const Button: FC<BtnProps> = ({ text, inputType, onClick, className }) => {
  return (
    <button onClick={onClick} type={inputType} className={className}>
      {text}
    </button>
  );
};

export default Button;
