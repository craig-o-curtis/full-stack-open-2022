import React from 'react';
import { Loader } from 'components/common';
import * as Styled from './AppLoader.styled';

interface AppLoaderWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const AppLoader = ({ children, isLoading }: AppLoaderWrapperProps) => {
  return (
    <Styled.AppLoaderWrapper>
      <>{children}</>
      {isLoading && (
        <Styled.AppLoaderContainer>
          <Loader />
        </Styled.AppLoaderContainer>
      )}
    </Styled.AppLoaderWrapper>
  );
};

export default AppLoader;
