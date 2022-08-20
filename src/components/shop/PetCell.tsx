import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "~/api-client/ApiClient";
import classnames from "classnames";
import Button from "../ui/Button";

type Props = {
  onView?: (item: Pet) => any;
  hasBuyNow?: boolean;
  isCollection?: boolean;
} & Pet;

export function PetCell(props: Props): ReactElement {
  const { thumbnail, name, price, onView, isCollection = false, hasBuyNow = false } = props;
  console.log(hasBuyNow);

  const item = props;

  const navigate = useNavigate();
  const mutation = useMutation<any, any, Pet>(addItemToCart);

  async function handleBuyItem(item: Pet) {
    await mutation.mutateAsync(item);
    return navigate("/checkout");
  }

  return (
    <div
      className={classnames("flex flex-col w-full sm:w-auto", {
        ["cursor-pointer"]: !isCollection,
      })}
    >
      <button
        onClick={() => !isCollection && onView?.(item)}
        className={classnames("text-left", { ["cursor-pointer"]: isCollection })}
      >
        <h2 className="text-2xl font-semibold">{name}</h2>
        <div className="w-full bg-gray-200">
          <img loading="lazy" src={thumbnail} className="w-full object-cover" alt={name} />
        </div>
        {!isCollection && <h3>${price}</h3>}
      </button>
      {hasBuyNow && <Button onClick={() => handleBuyItem(item)}>Buy Now</Button>}
    </div>
  );
}

export default PetCell;
