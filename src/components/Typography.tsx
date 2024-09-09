import React from "react";

interface ParagraphProps {
  children: string | string[] | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  maxLines?: number;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  style,
  className,
  maxLines,
}) => {
  return (
    <span
      className={`m-0 text-black ${className}`}
      style={{
        ...style,
        ...(maxLines
          ? {
              WebkitLineClamp: maxLines,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
            }
          : {}),
      }}
    >
      {children}
    </span>
  );
};

export const Label: React.FC<ParagraphProps> = ({
  children,
  className,
  style,
}) => (
  <Paragraph
    className={`text-sm font-normal leading-normal text-secondary-black ${className}`}
    style={style}
  >
    {children}
  </Paragraph>
);

export const BoldLabel: React.FC<ParagraphProps> = ({
  children,
  className,
  style,
}) => (
  <Label className={`!font-semibold ${className}`} style={style}>
    {children}
  </Label>
);
