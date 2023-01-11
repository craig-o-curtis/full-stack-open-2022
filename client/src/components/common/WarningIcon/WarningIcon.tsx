import { AiFillWarning } from 'react-icons/ai';
import { Icon } from 'components/common';

interface WarningIconProps {
  size?: number;
  spacing?: number;
}

const WarningIcon = ({ size, spacing }: WarningIconProps) => (
  <Icon variant="warning" size={size} spacing={spacing}>
    <AiFillWarning />
  </Icon>
);

export default WarningIcon;
