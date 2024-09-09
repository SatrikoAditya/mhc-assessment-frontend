"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { BoldLabel } from "../Typography";
import { Divider, Input } from "antd";
import Section from "../Section";

const { TextArea } = Input;

interface RejectWellnessEventModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: (
    status: "Approved" | "Rejected",
    confirmedDate: string,
    remarks: string
  ) => void;
  isLoading: boolean;
}

const RejectWellnessEventModal: React.FC<RejectWellnessEventModal> = ({
  isOpen,
  setIsOpen,
  onOk,
  isLoading,
}) => {
  const [remarks, setRemarks] = useState("");

  return (
    <BaseModal
      minWidth={"30vw"}
      isLoading={isLoading}
      title={
        <div className="flex flex-col gap-4">
          <BoldLabel className="text-xl">Reject wellness event</BoldLabel>
          <Divider type="horizontal" className="m-1 bg-divider-color" />
        </div>
      }
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => onOk("Rejected", "", remarks)}
    >
      <div className="w-full flex flex-col gap-6">
        <Section>
          <BoldLabel className="w-2/6">Remarks</BoldLabel>
          <TextArea
            placeholder="Remarks"
            name="remarks"
            className="w-full"
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </Section>
      </div>
    </BaseModal>
  );
};

export default RejectWellnessEventModal;
