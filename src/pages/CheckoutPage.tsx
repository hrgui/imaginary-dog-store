import React, { ReactElement } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getCart, checkout } from "~/api-client/ApiClient";
import Animal from "~/components/shop/AnimalCell";

function getTotal(items: Animal[]) {
  return items
    .reduce((total, item) => {
      return +item.price + total;
    }, 0)
    .toFixed(2);
}

export default function CheckoutPage(): ReactElement {
  const { data, isLoading } = useQuery<Animal[]>(["cart"], getCart);
  const mutation = useMutation<any, any, Animal[]>(checkout);
  const navigate = useNavigate();

  async function doPayNow() {
    await mutation.mutateAsync(data!);
    navigate("/collection");
  }

  if (isLoading) {
    return <div>Loading cart</div>;
  }

  if (!data || !data.length) {
    return <h2>Put items in cart to checkout</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl">Checkout</h1>
      <button onClick={() => navigate(-1)}>go back</button>

      {data.map((item) => {
        return <Animal key={item.id} item={item} />;
      })}

      <h1>Total: ${getTotal(data)}</h1>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={doPayNow}
      >
        Pay now
      </button>
    </div>
  );
}
