"use client";

import React from "react";
import { Avatar, Tooltip } from "antd";
import { BoldLabel } from "./Typography";
import { MdLogout } from "react-icons/md";
import { COLORS } from "@/utils/theme";
import { ICON_SIZE } from "@/utils/static";
import { useAuthContext } from "@/providers/authProvider";

interface Header {}

const Header: React.FC<Header> = ({}) => {
  const authContext = useAuthContext();
  return (
    <div className="sticky w-full top-0 z-[999] flex justify-end h-16 border-b border-borderColor px-7 bg-divider-color">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <Avatar>{authContext?.userData?.username[0]?.toUpperCase()}</Avatar>
          <BoldLabel>{authContext?.userData.username}</BoldLabel>
        </div>
        <Tooltip title="logout">
          <div
            onClick={() => authContext?.logout()}
            className="text-white text-xl mt-auto mb-auto cursor-pointer"
          >
            {" "}
            <MdLogout size={ICON_SIZE} color={COLORS["grey-text"]} />{" "}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
