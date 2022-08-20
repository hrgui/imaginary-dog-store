import { ReactElement } from "react";
import PetCell from "./PetCell";

interface Props {
  className?: string;
  pets: Pet[];
  onItemView: (item: Pet) => any;
  isLoading?: boolean;
}

export function PetsGrid({ className, isLoading, onItemView, pets }: Props): ReactElement {
  return (
    <div className={className}>
      {!isLoading && <div>Showing {pets.length} pets</div>}
      <div className="flex flex-wrap">
        {pets.map((item) => {
          return <PetCell hasBuyNow onView={onItemView} item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default PetsGrid;
