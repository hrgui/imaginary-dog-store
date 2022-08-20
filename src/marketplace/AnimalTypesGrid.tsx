import React, { ReactElement } from "react";
import AnimalTypeCell from "./AnimalTypeCell";

interface Props {
  className?: string;
  animal_types: AnimalType[];
  onItemView: (item: AnimalType) => any;
}

export default function AnimalTypesGrid({ className, animal_types }: Props): ReactElement {
  return (
    <div className={className}>
      <div>Showing {animal_types.length} pet types</div>
      <div className="flex flex-wrap">
        {animal_types.map((animal_type) => {
          return <AnimalTypeCell key={animal_type.id} animal_type={animal_type} />;
        })}
      </div>
    </div>
  );
}
