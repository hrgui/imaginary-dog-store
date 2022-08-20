import React from "react";
import { Route, Routes } from "react-router";
import AnimalViewPage from "./marketplace/AnimalViewPage";
import AnimalsPage from "./marketplace/AnimalsPage";
import AnimalTypesPage from "./marketplace/AnimalTypesPage";
import CollectionPage from "./marketplace/CollectionPage";
import CheckoutPage from "./marketplace/CheckoutPage";

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
