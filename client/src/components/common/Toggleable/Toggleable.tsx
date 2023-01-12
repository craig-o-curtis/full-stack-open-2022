// cSpell:ignore Toggleable
import React, { useImperativeHandle, useState } from 'react';

import { Box, Button } from 'components/common';

export interface ToggleableProps {
  isShowing?: boolean;
  showText?: string;
  hideText?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Toggleable = React.forwardRef(
  (
    {
      isShowing = false,
      showText = 'Show',
      hideText = 'Hide',
      disabled = false,
      children,
    }: ToggleableProps,
    ref
  ) => {
    const [isShow, setIsShow] = useState(isShowing);

    const handleToggle = (show?: boolean) => {
      setIsShow((prevShow) =>
        show !== undefined && typeof show === 'boolean' ? show : !prevShow
      );
    };

    useImperativeHandle(ref, () => ({
      isShow,
      handleToggle,
    }));

    return (
      <>
        <Box mb={2}>
          <Button onClick={() => handleToggle()} disabled={disabled}>
            {isShow ? hideText : showText}
          </Button>
        </Box>

        {isShow && children}
      </>
    );
  }
);

export default Toggleable;
