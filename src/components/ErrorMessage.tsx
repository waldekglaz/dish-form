import { FC } from "react";
interface ErrorMsgProps {
  message: string;
}

const ErrorMessage: FC<ErrorMsgProps> = ({ message }) => {
  return <p className="text-xs text-red-600">{message}</p>;
};

export default ErrorMessage;
