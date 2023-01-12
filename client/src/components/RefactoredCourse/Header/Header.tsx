import React from 'react';

import * as Styled from './Header.styled';

interface HeaderProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

const Header = ({ as = 'h1', children }: HeaderProps) => {
  return (
    <header>
      <Styled.Heading
        as={as}
        title={typeof children === 'string' ? children : undefined}
      >
        {children}
      </Styled.Heading>
    </header>
  );
};

export default Header;
