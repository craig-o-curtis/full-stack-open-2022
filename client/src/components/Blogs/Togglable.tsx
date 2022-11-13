// cSpell:ignore Togglable
import React, { useImperativeHandle, useState } from "react";
import { Box, Button } from "../common";

interface TogglableProps {
  isShowing?: boolean;
  showText?: string;
  hideText?: string;
  mb?: number;
  children: React.ReactNode;
}

const Togglable = React.forwardRef(
  (
    {
      isShowing = false,
      showText = "Show",
      hideText = "Hide",
      mb = 2,
      children,
    }: TogglableProps,
    ref
  ) => {
    const [isShow, setIsShow] = useState(isShowing);

    const handleToggle = (show?: boolean) => {
      setIsShow((prevShow) =>
        show !== undefined && typeof show === "boolean" ? show : !prevShow
      );
    };

    useImperativeHandle(ref, () => ({
      isShow,
      handleToggle,
    }));

    return (
      <>
        <Box mb={mb}>
          <Button onClick={() => handleToggle()}>
            {isShow ? hideText : showText}
          </Button>
        </Box>

        {isShow && children}
      </>
    );
  }
);

export default Togglable;
