import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const { className, ...inputProps } = props;
  return (
    <input
      className={twMerge(
        className,
        "border border-gray-400 p-2 rounded focus:border-black outline-none"
      )}
      {...inputProps}
    />
  );
};
