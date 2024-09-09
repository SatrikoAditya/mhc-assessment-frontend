import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface SpinnerProps {
  /**
   * Text label to render while loading
   */
  text?: string;
  /**
   * Color of the spinner
   */
  color?: string;
  /**
   * CSS style of label
   */
  labelStyle?: {};
}

/**
 * Used to indicate loading state for components
 */
const Spinner: React.FC<SpinnerProps> = ({ text, color, labelStyle }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24, color }} spin />}
        />
      </div>
      <div className="flex text-center" style={labelStyle}>
        {text}
      </div>
    </div>
  );
};

export default Spinner;
