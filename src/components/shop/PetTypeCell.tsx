import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

type Props = {} & Partial<PetType>;

export function PetTypeCell({ id, name, thumbnail, low, high, count = 0 }: Props): ReactElement {
  const typeDataEl = (
    <Card className="cursor-pointer w-full sm:w-auto hover:scale-105 transition-all">
      <div className="w-full min-h-[232px] lg:min-h-[318px] rounded-t-lg bg-gray-200">
        <img
          loading="lazy"
          src={thumbnail}
          className="w-full object-cover rounded-t-lg"
          alt={name}
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{name}(s)</h2>
        {low?.price && <h3>Lowest Price: ${low?.price}</h3>}
        {high?.price && <h3>Highest Price: ${high?.price}</h3>}
        {count <= 0 && <h4>SOLD OUT</h4>}
        {count <= 10 && count > 0 && <h4>Only {count} left!</h4>}
      </div>
    </Card>
  );

  if (count <= 0) {
    return typeDataEl;
  }

  return (
    <Link to={`/pets?type_id=${id}`} className="w-full sm:w-auto">
      {typeDataEl}
    </Link>
  );
}

export default PetTypeCell;
