import styled, { FlattenSimpleInterpolation, css } from 'styled-components';

import { spacing } from 'utils/styled';

import { BoxProps } from './Box.types';

const flexStyles = (props: BoxProps) => {
  const s: FlattenSimpleInterpolation[] = [];

  if (props.flex) {
    s.push(
      css`
        display: flex;
      `
    );
    if (props.flexDirection === undefined) {
      s.push(
        css`
          flex-direction: row;
        `
      );
    }
  }

  if (typeof props.flex === 'string') {
    s.push(
      css`
        flex: ${props.flex};
      `
    );
  }
  if (props.flexDirection !== undefined) {
    s.push(
      css`
        flex-direction: ${props.flexDirection};
      `
    );
  }
  if (props.justifyContent !== undefined) {
    s.push(
      css`
        justify-content: ${props.justifyContent};
      `
    );
  }
  if (props.alignItems !== undefined) {
    s.push(
      css`
        align-items: ${props.alignItems};
      `
    );
  }
  if (props.alignContent !== undefined) {
    s.push(
      css`
        align-content: ${props.alignContent};
      `
    );
  }
  if (props.flexWrap !== undefined) {
    s.push(
      css`
        flex-wrap: ${props.flexWrap};
      `
    );
  }
  if (props.flexGrow !== undefined) {
    s.push(
      css`
        flex-grow: ${props.flexGrow};
      `
    );
  }
  if (props.flexShrink !== undefined) {
    s.push(
      css`
        flex-shrink: ${props.flexShrink};
      `
    );
  }
  if (props.flexBasis !== undefined) {
    s.push(
      css`
        flex-basis: ${props.flexBasis};
      `
    );
  }
  if (props.alignSelf !== undefined) {
    s.push(
      css`
        align-self: ${props.alignSelf};
      `
    );
  }

  return s;
};

const positionStyles = ({ position, top, right, bottom, left }: BoxProps) => {
  const s: FlattenSimpleInterpolation[] = [];

  if (position !== undefined) {
    s.push(
      css`
        position: ${position};
      `
    );
  }
  if (top !== undefined) {
    s.push(
      css`
        top: ${typeof top === 'string' ? top : `${top}px`};
      `
    );
  }
  if (right !== undefined) {
    s.push(
      css`
        right: ${typeof right === 'string' ? right : `${right}px`};
      `
    );
  }
  if (bottom !== undefined) {
    s.push(
      css`
        width: ${typeof bottom === 'string' ? bottom : `${bottom}px`};
      `
    );
  }
  if (left !== undefined) {
    s.push(
      css`
        width: ${typeof left === 'string' ? left : `${left}px`};
      `
    );
  }

  return s;
};

const spacingStyles = (props: BoxProps) => {
  const s: FlattenSimpleInterpolation[] = [];

  const spacingOrAuto = (value: number | 'auto') => {
    if (value === 'auto') return 'auto';
    return spacing(value);
  };

  if (props.m !== undefined) {
    s.push(
      css`
        margin: ${Array.isArray(props.m)
          ? spacing.apply(null, props.m as any)
          : spacing(props.m)};
      `
    );
  }
  if (props.mx !== undefined) {
    s.push(
      css`
        margin-left: ${spacingOrAuto(props.mx)};
        margin-right: ${spacingOrAuto(props.mx)};
      `
    );
  }
  if (props.my !== undefined) {
    s.push(
      css`
        margin-top: ${spacingOrAuto(props.my)};
        margin-bottom: ${spacingOrAuto(props.my)};
      `
    );
  }
  if (props.mt !== undefined) {
    s.push(
      css`
        margin-top: ${spacingOrAuto(props.mt)};
      `
    );
  }
  if (props.mr !== undefined) {
    s.push(
      css`
        margin-right: ${spacingOrAuto(props.mr)};
      `
    );
  }
  if (props.mb !== undefined) {
    s.push(
      css`
        margin-bottom: ${spacingOrAuto(props.mb)};
      `
    );
  }
  if (props.ml !== undefined) {
    s.push(
      css`
        margin-left: ${spacingOrAuto(props.ml)};
      `
    );
  }
  if (props.mt !== undefined) {
    s.push(
      css`
        margin-top: ${spacingOrAuto(props.mt)};
      `
    );
  }

  if (props.p !== undefined) {
    s.push(
      css`
        padding: ${Array.isArray(props.p)
          ? spacing.apply(null, props.p as any)
          : spacing(props.p)};
      `
    );
  }
  if (props.px !== undefined) {
    s.push(
      css`
        padding-left: ${spacing(props.px)};
        padding-right: ${spacing(props.px)};
      `
    );
  }
  if (props.py !== undefined) {
    s.push(
      css`
        padding-top: ${spacing(props.py)};
        padding-bottom: ${spacing(props.py)};
      `
    );
  }
  if (props.pt !== undefined) {
    s.push(
      css`
        padding-top: ${spacing(props.pt)};
      `
    );
  }
  if (props.pr !== undefined) {
    s.push(
      css`
        padding-right: ${spacing(props.pr)};
      `
    );
  }
  if (props.pb !== undefined) {
    s.push(
      css`
        padding-bottom: ${spacing(props.pb)};
      `
    );
  }
  if (props.pl !== undefined) {
    s.push(
      css`
        padding-left: ${spacing(props.pl)};
      `
    );
  }
  if (props.pt !== undefined) {
    s.push(
      css`
        padding-top: ${spacing(props.pt)};
      `
    );
  }
  return s;
};

const Box = styled.div<BoxProps>`
  ${flexStyles}
  ${positionStyles}
    ${spacingStyles}
`;

export default Box;
