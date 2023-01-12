import { CSSProperties } from 'react';

type BoxNumberTuple = [
  first: number,
  second?: number,
  third?: number,
  fourth?: number
];
export type Margin = number | 'auto';

export interface BoxFlexProps {
  flex?: boolean | CSSProperties['flex'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  alignSelf?: CSSProperties['alignSelf'];
  flexWrap?: CSSProperties['flexWrap'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CSSProperties['flexBasis'];
}

export interface BoxPositionProps {
  position?: CSSProperties['position'];
  top?: CSSProperties['top'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
}

export interface BoxMarginProps {
  m?: number | BoxNumberTuple;
  mt?: Margin;
  mr?: Margin;
  mb?: Margin;
  ml?: Margin;
  mx?: Margin;
  my?: Margin;
}

export interface BoxPaddingProps {
  p?: number | BoxNumberTuple;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  px?: number;
  py?: number;
}

export type BoxProps = BoxMarginProps &
  BoxPaddingProps &
  BoxPositionProps &
  BoxFlexProps;
