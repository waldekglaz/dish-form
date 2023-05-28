import { FC } from "react";

interface InputSelectProps {
  htmlFor: string;
  label: string;
  register: Object;
  dishes: Array<{ type: string; attr: string[] }>;
}

const InputSelect: FC<InputSelectProps> = ({
  htmlFor,
  label,
  register,
  dishes,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {label}
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
        {...register}
      >
        <option value="" disabled>
          Choose here
        </option>
        {dishes.map((dish) => (
          <option key={dish.type} value={dish.type}>
            {dish.type}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InputSelect;
