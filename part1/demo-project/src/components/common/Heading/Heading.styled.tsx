import styled from "styled-components";

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

export const Heading = styled.span<HeadingProps>``;

Heading.defaultProps = {
  as: "h1",
};
