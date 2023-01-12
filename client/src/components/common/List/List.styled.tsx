import styled from 'styled-components';

import { Box } from 'components/common';

export const List = styled(Box).attrs({ as: 'ul' })`
  padding: 0;
  list-style-type: none;
`;
