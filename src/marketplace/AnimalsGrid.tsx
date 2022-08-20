import React, { ReactElement } from "react";
import Animal from "./AnimalCell";

interface Props {
  className?: string;
  animals: Animal[];
  onItemView: (item: Animal) => any;
  isLoading?: boolean;
}

export default function ItemsGrid({
  className,
  isLoading,
  onItemView,
  animals,
}: Props): ReactElement {
  return (
    <div className={className}>
      {!isLoading && <div>Showing {animals.length} animals</div>}
      <div className="flex flex-wrap">
        {animals.map((item) => {
          return <Animal hasBuyNow onView={onItemView} item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
