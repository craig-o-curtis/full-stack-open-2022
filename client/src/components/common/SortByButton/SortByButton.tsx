import React from 'react';
import { BsSortNumericDown, BsSortNumericUp } from 'react-icons/bs';

import { Button } from 'components/common';

interface SortByButtonProps {
  sortBy: 'ASC' | 'DESC';
  disabled?: boolean;
  onClickSortBy?: () => void;
}

const SortByButton = ({
  sortBy = 'ASC',
  disabled = false,
  onClickSortBy,
}: SortByButtonProps) => {
  return (
    <Button
      onClick={onClickSortBy}
      disabled={disabled}
      title={sortBy === 'ASC' ? 'Sort by ascending' : 'Sort by descending'}
    >
      {sortBy === 'ASC' ? <BsSortNumericDown /> : <BsSortNumericUp />}
    </Button>
  );
};

export default SortByButton;
