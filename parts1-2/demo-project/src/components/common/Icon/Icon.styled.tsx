import styled from "styled-components";

export type Variant = "success" | "danger" | "info";

const variantMap: Record<Variant, string> = {
  success: "forestgreen",
  danger: "firebrick",
  info: "dodgerblue",
};

interface IconWrapperProps {
  variant?: Variant;
  size?: number;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => `${props.size}rem`};
  color: ${(props) => variantMap[props?.variant || "info"]};
`;

IconWrapper.defaultProps = {
  variant: "info",
  size: 1,
};
