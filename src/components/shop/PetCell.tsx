import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "~/api-client/ApiClient";
import classnames from "classnames";
import Button from "../ui/Button";
import Card from "../ui/Card";

type Props = {
  onView?: (item: Pet) => any;
  hasBuyNow?: boolean;
  isCollection?: boolean;
} & Pet;

export function PetCell(props: Props): ReactElement {
  const { thumbnail, name, price, onView, isCollection = false, hasBuyNow = false } = props;

  const item = props;

  const navigate = useNavigate();
  const mutation = useMutation<any, any, Pet>(addItemToCart);

  async function handleBuyItem(item: Pet) {
    await mutation.mutateAsync(item);
    return navigate("/checkout");
  }

  return (
    <Card
      className={classnames("flex flex-col w-full sm:w-auto hover:scale-105 transition-all", {
        ["cursor-pointer"]: !isCollection,
      })}
    >
      <button
        onClick={() => !isCollection && onView?.(item)}
        className={classnames("text-left", { ["cursor-pointer"]: isCollection })}
      >
        <div className="w-full relative min-h-[320px] sm:min-h-[165px] lg:min-h-[210px] bg-gray-800 rounded-t-lg">
          <div className="w-full h-full bg-black animate-pulse absolute z-0"></div>
          <img
            loading="lazy"
            src={thumbnail}
            className="w-full absolute rounded-t-lg object-cover z-20"
            alt={name}
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{name}</h2>
          {!isCollection && <h3>${price}</h3>}
        </div>
      </button>
      {hasBuyNow && (
        <Button className="mt-auto" onClick={() => handleBuyItem(item)}>
          Buy Now
        </Button>
      )}
    </Card>
  );
}

export default PetCell;
