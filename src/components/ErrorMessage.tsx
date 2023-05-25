import React from "react";
interface ErrorMsgProps {
  message: string;
}

const ErrorMessage = (props: ErrorMsgProps) => {
  return <p className="text-xs text-red-600">{props.message}</p>;
};

export default ErrorMessage;
