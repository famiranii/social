import React from "react";

type Props = {
  title: string;
  Icon?: React.ComponentType<any>;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ title, Icon, type = "text", error, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          placeholder={title}
          className="w-full border-b border-gray-300 focus:border-sky-500 outline-none py-2 bg-transparent"
          {...rest}
        />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
