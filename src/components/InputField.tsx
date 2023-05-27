import { FC, ReactNode } from "react";
interface InputFieldProps {
  htmlFor: string;
  label: string;
  register: any;
  type: "text" | "number" | "time";
  children: ReactNode;
  placeholder?: string;
  step?: string;
}
const InputField: FC<InputFieldProps> = ({
  htmlFor,
  label,
  type,
  children,
  placeholder,
  register,
  step,
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}

        <input
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          {...register}
          step={step}
        />
        {children}
      </label>
    </>
  );
};

export default InputField;
