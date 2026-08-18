import React from "react";

type Props = {
  title: string;
  Icon?: React.ComponentType<any>;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LoginInput = React.forwardRef<HTMLInputElement, Props>(
  ({ title, Icon, type = "text", error, ...rest }, ref) => {
    return (
      <div className="flex flex-col relative">
        {Icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon width={18} height={18} />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={title}
          className="h-16 pl-14 w-full border border-gray-300/50 rounded-xl px-3 bg-amber-50/10 focus:border-white focus:outline-none text-white"
          {...rest}
        />
          {error && (
            <p className="absolute top-16 text-red-500 font-bold text-sm ml-1">{error}</p>
          )}
      </div>
    );
  },
);

LoginInput.displayName = "LoginInput";

export default LoginInput;
