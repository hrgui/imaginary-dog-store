import { ReactElement } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getCart, checkout } from "~/api-client/ApiClient";
import PetCell from "~/components/shop/PetCell";
import PageLoading from "~/components/app/PageLoading";
import PetsGrid from "~/components/shop/PetsGrid";
import ArrowLeft from "~/components/ui/icons/ArrowLeft";
import Button from "~/components/ui/Button";
import Card from "~/components/ui/Card";

function getTotal(items: Pet[]) {
  return items
    .reduce((total, item) => {
      return +item.price + total;
    }, 0)
    .toFixed(2);
}

export default function CheckoutPage(): ReactElement {
  const { data, isLoading } = useQuery<Pet[]>(["cart"], getCart);
  const mutation = useMutation<any, any, Pet[]>(checkout);
  const navigate = useNavigate();

  async function doPayNow() {
    await mutation.mutateAsync(data!);
    navigate("/collection");
  }

  if (isLoading) {
    return <PageLoading />;
  }

  if (!data || !data.length) {
    return <h2>Put items in cart to checkout</h2>;
  }

  return (
    <div>
      <div className="flex gap-2 mt-2 mb-2">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
          <span className="sr-only">go back</span>
        </button>

        <h1 className="text-3xl">Checkout</h1>
      </div>

      <h1 className="font-semibold text-xl">Total: ${getTotal(data)}</h1>
      <Button className="w-full" onClick={doPayNow}>
        Pay now
      </Button>

      {data.map(({ thumbnail, name, price }) => (
        <Card className="flex gap-2 p-2 mt-4 mb-4">
          <div className="m-2">
            <img className="w-20 h-20 rounded-sm object-cover" src={thumbnail} alt={name} />
          </div>
          <div>
            <h1 className="text-2xl">{name}</h1>
            <h3 className="text-xl">${price}</h3>
          </div>
        </Card>
      ))}

      <h1 className="font-semibold text-xl text-right">Total: ${getTotal(data)}</h1>
    </div>
  );
}
