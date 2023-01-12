import styled from 'styled-components';

import { Box, Button, List, ListItem } from 'components/common';

export const BlogItem = styled(ListItem)`
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
`;

export const BlogData = styled(List)``;
export const BlogDatum = styled(ListItem)``;

export const BlogItemBox = styled(Box)``;

export const ButtonContainer = styled(Box)``;

export const DeleteButton = styled(Button)`
  background-color: firebrick !important;
  color: white;
`;

export const LikeButton = styled(Button)`
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  background: transparent;
  color: dodgerblue;
`;
