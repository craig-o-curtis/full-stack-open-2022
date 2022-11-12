import React from "react";
import { Button } from "../.";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";

interface SortByButtonProps {
  sortBy: "ASC" | "DESC";
  onClickSortBy?: () => void;
}

const SortByButton = ({ sortBy = "ASC", onClickSortBy }: SortByButtonProps) => {
  return (
    <Button onClick={onClickSortBy}>
      {sortBy === "ASC" ? <BsSortNumericDown /> : <BsSortNumericUp />}
    </Button>
  );
};

export default SortByButton;
