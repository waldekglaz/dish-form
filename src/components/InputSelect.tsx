import { FC } from "react";

interface InputSelectProps {
  htmlFor: string;
  label: string;
  register: Object;
}

const InputSelect: FC<InputSelectProps> = ({ htmlFor, label, register }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {label}
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...register}
      >
        <option value="" disabled>
          Choose here
        </option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>
    </label>
  );
};

export default InputSelect;
