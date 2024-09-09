"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { BoldLabel } from "../Typography";
import { Divider, Select } from "antd";
import moment from "moment";
import Section from "../Section";

interface ApproveWellnessEventModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: (
    status: "Approved" | "Rejected",
    confirmedDate: string,
    remarks: string
  ) => void;
  proposedDates: Date[];
  isLoading: boolean;
}

const ApproveWellnessEventModal: React.FC<ApproveWellnessEventModal> = ({
  isOpen,
  setIsOpen,
  onOk,
  proposedDates,
  isLoading,
}) => {
  const [confirmedDate, setConfirmedDate] = useState("");

  return (
    <BaseModal
      minWidth={"30vw"}
      isLoading={isLoading}
      title={
        <div className="flex flex-col gap-4">
          <BoldLabel className="text-xl">Approve wellness event</BoldLabel>
          <Divider type="horizontal" className="m-1 bg-divider-color" />
        </div>
      }
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => onOk("Approved", confirmedDate, "")}
    >
      <div className="w-full flex flex-col gap-6">
        <Section>
          <BoldLabel className="w-2/6">Select date</BoldLabel>
          <Select
            showSearch
            optionFilterProp="label"
            options={proposedDates?.map((date) => ({
              label: moment(new Date(date)).format("DD-MM-YYYY"),
              value: date,
            }))}
            onChange={(value) => setConfirmedDate(value)}
            className="w-full"
          />
        </Section>
      </div>
    </BaseModal>
  );
};

export default ApproveWellnessEventModal;
