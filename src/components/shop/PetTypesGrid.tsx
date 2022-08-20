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
      <div className="flex flex-wrap">
        {petTypes.map((petType) => {
          return <PetTypeCell key={petType.id} {...petType} />;
        })}
      </div>
    </div>
  );
}

export default PetTypesGrid;
