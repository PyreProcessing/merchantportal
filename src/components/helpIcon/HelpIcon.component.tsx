import { Tooltip } from 'antd';
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface HelpIconProps {
  tooltip: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | undefined;
  size?: number;
}
const HelpIcon = (props: HelpIconProps) => {
  return (
    <Tooltip title={props.tooltip} placement={props.placement}>
      <FaQuestionCircle size={props.size} />
    </Tooltip>
  );
};

export default HelpIcon;
