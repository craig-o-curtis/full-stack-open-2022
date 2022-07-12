import { AiFillCheckCircle } from "react-icons/ai";
import Icon from "../Icon";

interface SuccessIconProps {
  size?: number;
  spacing?: number;
}

const SuccessIcon = ({ size, spacing }: SuccessIconProps) => (
  <Icon variant="success" size={size} spacing={spacing}>
    <AiFillCheckCircle />
  </Icon>
);

export default SuccessIcon;
