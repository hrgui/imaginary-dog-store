import React from "react";
import cx from "classnames";
import { twMerge } from "tailwind-merge";

type Props = {
  variant?: "default" | "danger";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({ variant = "default", className: inputtedClassName, ...props }: Props) => {
  function getVariantClassName(variant: Props["variant"]) {
    const variantClassNameMap = {
      default: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`,
      danger: `focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`,
    };

    return variantClassNameMap[variant!];
  }

  const className = twMerge(cx(getVariantClassName(variant), inputtedClassName));
  return <button className={className} {...props} />;
};

export default Button;
