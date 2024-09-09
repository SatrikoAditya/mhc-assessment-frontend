import React from 'react';
import { ICON_SIZE } from '@/utils/static';
import { COLORS } from '@/utils/theme';
import { Label } from './Typography';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface TextWithIcon {
  text?: string | React.ReactNode;
  Icon?: React.FC<any>;
  className?: string;
  onClick?: (...params: any) => void;
  isHighlighted?: boolean;
  iconPlacement?: 'left' | 'right';
  iconColor?: string;
  textColor?: string;
  loading?: boolean;
}

const TextWithIcon: React.FC<TextWithIcon> = ({
  text = '',
  Icon,
  className = '',
  onClick,
  isHighlighted,
  iconPlacement = 'left',
  iconColor = COLORS['slate-grey'],
  textColor = COLORS['slate-grey'],
  loading,
}) => {
  return (
    <div
      className={`flex gap-2 items-center ${className} ${onClick ? 'cursor-pointer' : ''} ${isHighlighted ? 'bg-light-blue' : ''}`}
      onClick={onClick}>
      {(Icon || loading) &&
        iconPlacement === 'left' &&
        (Icon ? (
          <Icon color={iconColor} size={ICON_SIZE} />
        ) : (
          loading && <Spin indicator={<LoadingOutlined />} />
        ))}
      {text && (
        <Label style={{ color: textColor }} className={``}>
          {text}
        </Label>
      )}
      {(Icon || loading) &&
        iconPlacement === 'right' &&
        (Icon ? (
          <Icon color={iconColor} size={ICON_SIZE} />
        ) : (
          loading && <Spin indicator={<LoadingOutlined />} />
        ))}
    </div>
  );
};

export default TextWithIcon;
