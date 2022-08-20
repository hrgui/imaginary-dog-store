import { ReactElement } from "react";
import PetTypeCell from "./PetTypeCell";

interface Props {
  className?: string;
  petTypes: PetType[];
  onItemView: (item: PetType) => any;
}

export function PetTypesGrid({ className, petTypes }: Props): ReactElement {
  return (
    <div className={className}>
      <div>Showing {petTypes.length} pet types</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {petTypes.map((petType) => {
          return <PetTypeCell key={petType.id} {...petType} />;
        })}
      </div>
    </div>
  );
}

export default PetTypesGrid;
