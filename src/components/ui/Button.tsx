import React from "react";
import cx from "classnames";
import { twMerge } from "tailwind-merge";

type Props = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ className: inputtedClassName, ...props }: Props) => {
  const className = twMerge(
    cx(
      inputtedClassName,
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    )
  );
  return <button className={className} {...props} />;
};

export default Button;
