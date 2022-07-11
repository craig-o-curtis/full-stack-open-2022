import styled from "styled-components";

export type Variant = "success" | "danger" | "info" | "warning";

const variantDarKMap: Record<Variant, string> = {
  success: "forestgreen",
  danger: "firebrick",
  warning: "goldenrod",
  info: "royalblue",
};

const variantLightMap: Record<Variant, string> = {
  success: "lime",
  danger: "pink",
  warning: "lightyellow",
  info: "aliceblue",
};

interface BannerProps {
  variant: Variant;
}

export const Banner = styled.div<BannerProps>`
  border: ${(props) => `1px solid ${variantDarKMap[props.variant || "info"]}`};
  background-color: ${(props) => variantLightMap[props.variant || "info"]};
  color: ${(props) => variantDarKMap[props.variant || "info"]};
  padding: 1rem;
`;

Banner.defaultProps = {
  variant: "info",
};
