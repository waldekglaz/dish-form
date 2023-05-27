import { FC, ReactNode } from "react";
interface InputFieldProps {
  labelFor: string;
  label: string;
  register: any;
  type: "text" | "number" | "time";
  children: ReactNode;
  placeholder?: string;
  step?: number;
}
const InputField: FC<InputFieldProps> = ({
  labelFor,
  label,
  type,
  children,
  placeholder,
  register,
}) => {
  return (
    <>
      <label
        htmlFor={labelFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        {...register}
      />
      {children}
    </>
  );
};

export default InputField;
