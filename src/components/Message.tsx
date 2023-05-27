import { FC, ReactNode } from "react";

interface MessageProps {
  text: string;
  children: ReactNode;
  success: boolean;
}

const Message: FC<MessageProps> = ({ text, children, success }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center max-w-xs mx-auto p-4">
      <p
        className={`${
          success ? "text-green-500" : "text-red-600"
        } text-xl text-center my-20`}
      >
        {text}
      </p>
      {children}
    </div>
  );
};

export default Message;
