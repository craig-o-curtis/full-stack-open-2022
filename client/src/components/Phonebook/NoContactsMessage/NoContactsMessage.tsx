import { TiWarning } from 'react-icons/ti';

import * as Styled from './NoContactsMessage.styled';

interface NoContactsProps {
  children: React.ReactNode;
}

const NoContacts = ({ children }: NoContactsProps) => (
  <Styled.NoContactsWrapper>
    <TiWarning />
    <Styled.WarningText>{children}</Styled.WarningText>
  </Styled.NoContactsWrapper>
);

export default NoContacts;
