import { AiFillCheckCircle } from "react-icons/ai";
import Icon from "../Icon";

interface SuccessIconProps {
  size?: number;
}

const SuccessIcon = ({ size }: SuccessIconProps) => (
  <Icon variant="success" size={size}>
    <AiFillCheckCircle />
  </Icon>
);

export default SuccessIcon;
