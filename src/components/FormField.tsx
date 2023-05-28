import { FC, ReactNode } from "react";

interface FormFieldProps {
  children: ReactNode;
}

const FormField: FC<FormFieldProps> = ({ children }) => {
  return <div className="mb-6">{children}</div>;
};

export default FormField;
