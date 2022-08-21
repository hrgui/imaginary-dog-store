import React from "react";
import { twMerge } from "tailwind-merge";
import cx from "classnames";

type Props = {} & React.SVGProps<SVGSVGElement>;

const ArrowLeft = ({ className: inputtedClassName }: Props) => {
  const className = twMerge(cx("w-6 h-6", inputtedClassName));

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      ></path>
    </svg>
  );
};

export default ArrowLeft;
