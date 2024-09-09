import { Button, Tooltip } from "antd";

const mapSizeToClassname = {
  middle: "text-sm",
  small: "text-xs",
  large: "text-base",
};

interface Button {
  size?: "small" | "middle" | "large";
  children: React.ReactNode;
  type?: "primary" | "dashed" | "default" | "link" | "text";
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  className?: string;
  style?: {};
  primaryColor?: string;
  textColor?: string;
  isLoading?: boolean;
  tooltip?: string;
}

const CustomButton: React.FC<Button> = ({
  size = "small",
  children,
  type = "primary",
  onClick,
  disabled,
  className,
  style,
  primaryColor = "#1870b4",
  textColor = "#f0f0f0",
  isLoading,
  tooltip,
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        size={size}
        className={`${
          typeof size === "string" ? mapSizeToClassname[size] : ""
        } ${className} border-none hover:brightness-125 transition-all font-light ${
          disabled ? "!brightness-75" : ""
        }`}
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{
          ...(style || {}),
          background: type === "primary" ? primaryColor : "",
          color: textColor,
        }}
        loading={isLoading}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default CustomButton;
