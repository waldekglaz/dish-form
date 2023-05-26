import { FC, ReactNode } from "react";

interface FormFieldProps {
  children: ReactNode;
}

const FormField: FC<FormFieldProps> = (props) => {
  return <div className="mb-6">{props.children}</div>;
};

export default FormField;
