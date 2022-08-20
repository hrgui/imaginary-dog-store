import React, { ReactElement } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimal, addItemToCart } from "./ApiClient/ApiClient";
import Button from "../components/Button";

export default function AnimalViewPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: item } = useQuery<any>([`item${id}`], () => getAnimal(id as string));
  const mutation = useMutation<any, any, Animal>(addItemToCart);
  const navigate = useNavigate();

  async function handleBuyItem(item: Animal) {
    await mutation.mutateAsync(item);
    return navigate("/checkout");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!item) {
    return (
      <div>
        <h1>Not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <img loading="lazy" src={item.large_img} alt={item.name} />
      <h3>${item.price}</h3>
      <Button onClick={() => handleBuyItem(item)}>Buy Now</Button>
    </div>
  );
}
