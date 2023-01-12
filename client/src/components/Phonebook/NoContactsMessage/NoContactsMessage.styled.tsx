import styled from 'styled-components';

export const WarningText = styled.span``;

export const NoContactsWrapper = styled.div`
  display: flex;
  padding: 1rem;
  border-color: goldenrod;
  border-width: 1px;
  border-style: double;
  background-color: lightgoldenrodyellow;
  display: flex;
  align-items: center;

  svg {
    font-size: 1.25rem;
    color: darkgoldenrod;
    margin-right: 1rem;
  }
  ${WarningText} {
    color: darkgoldenrod;
  }
`;
