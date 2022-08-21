import cx from "classnames";
import { twMerge } from "tailwind-merge";

type Props = {} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Card = ({ className: inputtedClassName, ...props }: Props) => {
  const className = twMerge(
    cx(
      `bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`,
      inputtedClassName
    )
  );

  return <div className={className} {...props} />;
};

export default Card;
