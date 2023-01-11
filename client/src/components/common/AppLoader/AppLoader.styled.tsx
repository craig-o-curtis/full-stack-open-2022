import styled from 'styled-components';
import { Box } from 'components/common';

export const AppLoaderWrapper = styled(Box)`
  height: 100%;
  width: 100%;
`;

AppLoaderWrapper.defaultProps = {
  position: 'relative',
};

export const AppLoaderContainer = styled(Box)`
  background-color: white;
  height: 100%;
  width: 100%;
  opacity: 0.8;
`;

AppLoaderContainer.defaultProps = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flex: true,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
