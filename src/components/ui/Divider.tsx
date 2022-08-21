import cx from "classnames";
import { twMerge } from "tailwind-merge";

type Props = {} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;

const Divider = ({ className: inputtedClassName, ...props }: Props) => {
  const className = twMerge(
    cx(`my-8 h-px bg-gray-200 border-0 dark:bg-gray-700`, inputtedClassName)
  );

  return <hr className={className} {...props} />;
};

export default Divider;
