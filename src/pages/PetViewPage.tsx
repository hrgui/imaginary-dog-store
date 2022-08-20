import { ReactElement } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getAnimal, addItemToCart } from "~/api-client/ApiClient";
import Button from "~/components/ui/Button";
import PageLoading from "~/components/app/PageLoading";

export function PetViewPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: item } = useQuery<any>([`item${id}`], () => getAnimal(id as string));
  const mutation = useMutation<any, any, Pet>(addItemToCart);
  const navigate = useNavigate();

  async function handleBuyItem(item: Pet) {
    await mutation.mutateAsync(item);
    return navigate("/checkout");
  }

  if (isLoading) {
    return <PageLoading />;
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
      <div className="w-full min-h-[358px] h-full sm:w-[600px] sm:h-[600px] object-cover bg-gray-200">
        <img loading="lazy" src={item.large_img} alt={item.name} />
      </div>
      <h3>${item.price}</h3>
      <Button onClick={() => handleBuyItem(item)}>Buy Now</Button>
    </div>
  );
}

export default PetViewPage;
