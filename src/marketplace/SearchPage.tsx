import React, { ReactElement } from "react";
import SearchFilters from "./SearchFilters";
import ItemsGrid from "./ItemsGrid";
import { useHistory } from "react-router";
const items = require("../fixtures/items.json");

interface Props {}

export default function SearchPage({}: Props): ReactElement {
  const history = useHistory();
  return (
    <div style={{ display: "flex" }}>
      <SearchFilters />
      <ItemsGrid
        items={items}
        style={{ marginLeft: "8px" }}
        onItemView={({ id }) => history.push(`/item/${id}`)}
      />
    </div>
  );
}
