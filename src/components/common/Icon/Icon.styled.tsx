import styled from "styled-components";

export type Variant = "success" | "danger" | "info" | "warning";

const variantMap: Record<Variant, string> = {
  success: "forestgreen",
  danger: "firebrick",
  warning: "goldenrod",
  info: "dodgerblue",
};

interface IconWrapperProps {
  variant?: Variant;
  size?: number;
  spacing?: number;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => `${props.size}rem`};
  color: ${(props) => variantMap[props?.variant || "info"]};
  margin-left: ${(props) => `${props.spacing}rem`};
  margin-right: ${(props) => `${props.spacing}rem`};
`;

IconWrapper.defaultProps = {
  variant: "info",
  size: 1,
  spacing: 0.25,
};
