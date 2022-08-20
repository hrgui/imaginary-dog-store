import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  animal_type: AnimalType;
}

export default function AnimalTypeCell({ animal_type }: Props): ReactElement {
  const animalTypeData = (
    <div className="m-1 cursor-pointer">
      <h2 className="text-2xl font-semibold">{animal_type.name}(s)</h2>
      <div className="w-[300px] h-[300px] bg-gray-200">
        <img
          loading="lazy"
          src={animal_type.thumbnail}
          width={300}
          height={300}
          alt={animal_type.name}
        />
      </div>
      {animal_type.low?.price && <h3>Lowest Price: ${animal_type.low?.price}</h3>}
      {animal_type.high?.price && <h3>Highest Price: ${animal_type.high?.price}</h3>}
      {animal_type.count <= 0 && <h4>SOLD OUT</h4>}
      {animal_type.count <= 10 && animal_type.count > 0 && <h4>Only {animal_type.count} left!</h4>}
    </div>
  );

  if (animal_type.count <= 0) {
    return animalTypeData;
  }

  return <Link to={`/animals?type_id=${animal_type.id}`}>{animalTypeData}</Link>;
}
