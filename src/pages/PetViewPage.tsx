import { ReactElement } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getPet, addItemToCart } from "~/api-client/ApiClient";
import Button from "~/components/ui/Button";
import PageLoading from "~/components/app/PageLoading";
import Card from "~/components/ui/Card";

export function PetViewPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: item } = useQuery<any>([`item${id}`], () => getPet(id as string));
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
    <div className="grid grid-cols-1 xl:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold mb-2">{item.name}</h1>
        <div className="w-full  sm:w-[600px] object-cover bg-gray-200">
          <img loading="lazy" src={item.large_img} alt={item.name} />
        </div>
      </div>

      <div className="mt-4 mb-4 xl:mt-0">
        <p className="sm:prose-sm md:prose-md dark:prose-invert mb-4">{item.description}</p>
        <Card className="w-full mt-2 p-5">
          <h3 className="text-2xl">${item.price}</h3>
          <Button className="w-full mt-2" onClick={() => handleBuyItem(item)}>
            Buy Now
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default PetViewPage;
