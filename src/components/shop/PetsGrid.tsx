import { ReactElement } from "react";
import Divider from "../ui/Divider";
import PetCell from "./PetCell";

interface Props {
  className?: string;
  pets: Pet[];
  onItemView?: (item: Pet) => any;
  isLoading?: boolean;
  hasBuyNow?: boolean;
  isCollection?: boolean;
}

export function PetsGrid({
  className,
  isLoading,
  hasBuyNow = true,
  onItemView,
  pets,
  isCollection,
}: Props): ReactElement {
  return (
    <div className={className}>
      {!isLoading && <span className="mb-2 mt-2 block">Showing {pets.length} pets</span>}
      <Divider />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {pets.map((pet) => {
          return (
            <PetCell
              {...pet}
              key={pet.id}
              isCollection={isCollection}
              hasBuyNow={hasBuyNow}
              onView={onItemView}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PetsGrid;
