import { MdError } from "react-icons/md";
import Icon from "../Icon";

interface ErrorIconProps {
  size?: number;
  spacing?: number;
}

const ErrorIcon = ({ size, spacing }: ErrorIconProps) => (
  <Icon variant="danger" size={size} spacing={spacing}>
    <MdError />
  </Icon>
);

export default ErrorIcon;
