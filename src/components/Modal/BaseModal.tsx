import React from "react";
import { ConfigProvider, Modal, ModalProps } from "antd";
import { FC } from "react";
import { COLORS } from "@/utils/theme";

interface BaseModalProps extends ModalProps {
  title: React.ReactNode;
  open?: boolean;
  onOk?: (e?: any) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  footer?: React.ReactNode[] | null | undefined;
  minWidth?: number | string;
  maxWidth?: number | string;
  okText?: string;
  isLoading?: boolean;
  colorConfig?: {
    background: string;
    text: string;
    primary: string;
  };
  style?: React.CSSProperties | undefined;
  children: React.ReactNode;
}

const BaseModal: FC<BaseModalProps> = ({
  title,
  children,
  open,
  onOk,
  onCancel,
  footer,
  minWidth,
  okText,
  isLoading,
  colorConfig = {
    background: COLORS.white,
    text: COLORS.black,
    primary: COLORS["primary-blue"],
  },
  maxWidth,
  style,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: colorConfig.background,
            headerBg: colorConfig.background,
            colorText: colorConfig.text,
            colorIcon: colorConfig.text,
          },
          Button: {
            colorBgBase: colorConfig.primary,
          },
        },
      }}
    >
      <Modal
        title={
          <span className="text-2xl" style={{ color: colorConfig.text }}>
            {title}
          </span>
        }
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={footer}
        style={{ minWidth, maxWidth, ...style }}
        okText={okText}
        okButtonProps={{
          loading: isLoading,
          style: { background: colorConfig.primary },
        }}
        cancelButtonProps={{
          style: {
            background: "#00000000",
            border: "none",
            color: colorConfig.text,
          },
        }}
        destroyOnClose
        {...props}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};

export default BaseModal;
