import { Route, Routes } from "react-router";
import AnimalViewPage from "~/pages/AnimalViewPage";
import AnimalsPage from "~/pages/AnimalsPage";
import AnimalTypesPage from "~/pages/AnimalTypesPage";
import CollectionPage from "~/pages/CollectionPage";
import CheckoutPage from "~/pages/CheckoutPage";

type Props = {};

const AppRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<AnimalTypesPage />} />
      <Route path="/animals" element={<AnimalsPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/item/:id" element={<AnimalViewPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRoutes;
