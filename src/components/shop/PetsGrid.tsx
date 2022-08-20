import { ReactElement } from "react";
import PetCell from "./PetCell";

interface Props {
  className?: string;
  animals: Pet[];
  onItemView: (item: Pet) => any;
  isLoading?: boolean;
}

export function PetsGrid({ className, isLoading, onItemView, animals }: Props): ReactElement {
  return (
    <div className={className}>
      {!isLoading && <div>Showing {animals.length} animals</div>}
      <div className="flex flex-wrap">
        {animals.map((item) => {
          return <PetCell hasBuyNow onView={onItemView} item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default PetsGrid;
