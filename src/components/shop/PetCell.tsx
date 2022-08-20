import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "~/api-client/ApiClient";
import classnames from "classnames";
import Button from "../ui/Button";

interface Props {
  item: Pet;
  onView?: (item: Pet) => any;
  hasBuyNow?: boolean;
  isCollection?: boolean;
}

export function PetCell({
  item,
  onView,
  isCollection = false,
  hasBuyNow = false,
}: Props): ReactElement {
  const navigate = useNavigate();
  const mutation = useMutation<any, any, Pet>(addItemToCart);

  async function handleBuyItem(item: Pet) {
    await mutation.mutateAsync(item);
    return navigate("/checkout");
  }

  return (
    <div
      className={classnames("flex flex-col w-full sm:w-auto", {
        ["cursor-pointer"]: isCollection,
      })}
    >
      <button
        onClick={() => !isCollection && onView?.(item)}
        className={classnames("text-left", { ["cursor-pointer"]: isCollection })}
      >
        <h2 className="text-2xl font-semibold">{item.name}</h2>
        <div className="w-full sm:w-[300px] h-[300px] bg-gray-200">
          <img
            loading="lazy"
            src={item.thumbnail}
            className="w-full sm:w-[300px] h-[300px] object-cover"
            alt={item.name}
          />
        </div>
        {!isCollection && <h3>${item.price}</h3>}
      </button>
      {hasBuyNow && <Button onClick={() => handleBuyItem(item)}>Buy Now</Button>}
    </div>
  );
}

export default PetCell;
