import { Route, Routes } from "react-router";
import PetViewPage from "~/pages/PetViewPage";
import PetsPage from "~/pages/PetsPage";
import PetTypesPage from "~/pages/PetTypesPage";
import CollectionPage from "~/pages/CollectionPage";
import CheckoutPage from "~/pages/CheckoutPage";

type Props = {};

const AppRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<PetTypesPage />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/item/:id" element={<PetViewPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRoutes;
