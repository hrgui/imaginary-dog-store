import { ReactElement } from "react";
import Divider from "../ui/Divider";
import PetTypeCell from "./PetTypeCell";

interface Props {
  className?: string;
  petTypes: PetType[];
  onItemView: (item: PetType) => any;
}

export function PetTypesGrid({ className, petTypes }: Props): ReactElement {
  return (
    <div className={className}>
      <span className="mb-2 mt-2 block">Showing {petTypes.length} pet types</span>
      <Divider />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {petTypes.map((petType) => {
          return <PetTypeCell key={petType.id} {...petType} />;
        })}
      </div>
    </div>
  );
}

export default PetTypesGrid;
