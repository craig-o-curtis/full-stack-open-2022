import { MdError } from "react-icons/md";
import Icon from "../Icon";

interface ErrorIconProps {
  size?: number;
}

const ErrorIcon = ({ size }: ErrorIconProps) => (
  <Icon variant="danger" size={size}>
    <MdError />
  </Icon>
);

export default ErrorIcon;
