import React, { useImperativeHandle, useState } from "react";
import { Box, Button } from "../common";

interface TogglableProps {
  isShowing?: boolean;
  showText?: string;
  hideText?: string;
  children: React.ReactNode;
}

const Togglable = React.forwardRef(
  (
    {
      isShowing = false,
      showText = "Show",
      hideText = "Hide",
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
        <Box mb={2}>
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
