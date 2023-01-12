import * as Styled from './Image.styled';

interface ImageProps {
  src: string;
  alt: string;
}

const Image = ({ src, alt }: ImageProps) => (
  <Styled.Image src={src} alt={alt} />
);

export default Image;
