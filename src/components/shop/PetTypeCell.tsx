import { ReactElement } from "react";
import { Link } from "react-router-dom";

type Props = {} & PetType;

export function PetTypeCell({ id, name, thumbnail, low, high, count }: Props): ReactElement {
  const typeDataEl = (
    <div className="mr-4 mb-4 cursor-pointer w-full sm:w-auto">
      <h2 className="text-2xl font-semibold">{name}(s)</h2>
      <div className="w-full sm:w-[300px] h-[300px] bg-gray-200">
        <img
          loading="lazy"
          src={thumbnail}
          className="w-full sm:w-[300px] h-[300px] object-cover"
          alt={name}
        />
      </div>
      {low?.price && <h3>Lowest Price: ${low?.price}</h3>}
      {high?.price && <h3>Highest Price: ${high?.price}</h3>}
      {count <= 0 && <h4>SOLD OUT</h4>}
      {count <= 10 && count > 0 && <h4>Only {count} left!</h4>}
    </div>
  );

  if (count <= 0) {
    return typeDataEl;
  }

  return (
    <Link to={`/animals?type_id=${id}`} className="w-full sm:w-auto">
      {typeDataEl}
    </Link>
  );
}

export default PetTypeCell;
