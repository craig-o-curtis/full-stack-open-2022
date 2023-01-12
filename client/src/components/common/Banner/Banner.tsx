import * as Styled from './Banner.styled';

interface ErrorProps {
  variant: 'success' | 'danger' | 'info' | 'warning';
  children: React.ReactNode;
}

const Banner = ({ variant, children }: ErrorProps) => {
  return <Styled.Banner variant={variant}>{children}</Styled.Banner>;
};

export default Banner;
