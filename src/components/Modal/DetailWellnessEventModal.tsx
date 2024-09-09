"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Divider, Tag, Modal } from "antd";
import { BoldLabel, Label } from "../Typography";
import CustomButton from "../CustomButton";
import { COLORS } from "@/utils/theme";
import TextWithIcon from "../TextWithIcon";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { ExclamationCircleFilled } from "@ant-design/icons";
import moment from "moment";
import { useChangeWellnessEventStatus } from "@/hooks/react-query/wellness-event";
import ApproveWellnessEventModal from "./ApproveWellnessEventModal";
import RejectWellnessEventModal from "./RejectWellnessEventModal";
import { useAuthContext } from "@/providers/authProvider";
import Section from "../Section";

const { confirm } = Modal;

interface DetailWellnessEventModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailData: any;
}

const DetailWellnessEventModal: React.FC<DetailWellnessEventModal> = ({
  isOpen,
  setIsOpen,
  detailData,
}) => {
  const authContext = useAuthContext();
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false);

  const changeWellnessEventStatus = useChangeWellnessEventStatus({
    onMutationFailed: () => {},
    onMutationSuccess: () => {
      setIsOpenApproveModal(false);
      setIsOpenRejectedModal(false);
    },
  });

  const clickApproveOrReject = (status: "approve" | "reject") => {
    confirm({
      title: `Are you sure you want to ${status} this event?`,
      icon: <ExclamationCircleFilled />,
      content: `This action is permanent and cannot be undone.`,
      onOk() {
        if (status == "approve") setIsOpenApproveModal(true);
        if (status == "reject") setIsOpenRejectedModal(true);
      },
      onCancel() {
        setIsOpenApproveModal(false);
        setIsOpenRejectedModal(false);
      },
    });
  };

  const handleApproveOrReject = async (
    status: "Approved" | "Rejected",
    confirmedDate: string,
    remarks: string
  ) => {
    try {
      await changeWellnessEventStatus.mutateAsync({
        id: detailData.id,
        status,
        remarks: remarks ?? null,
        confirmedDate: confirmedDate ? new Date(confirmedDate) : null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BaseModal
        minWidth={"45vw"}
        isLoading={false}
        title={
          <div className="flex flex-col gap-4">
            <BoldLabel className="text-xl">Detail wellness event</BoldLabel>
            <Divider type="horizontal" className="m-1 bg-divider-color" />
          </div>
        }
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => {}}
        footer={null}
      >
        <div className="w-full flex flex-col gap-6">
          <Section>
            <BoldLabel className="w-2/6">Company name</BoldLabel>
            <Label>{detailData?.company?.name}</Label>
          </Section>
          <Section>
            <BoldLabel className="w-2/6">Vendor name</BoldLabel>
            <Label>{detailData?.vendor?.name}</Label>
          </Section>
          <Section>
            <BoldLabel className="w-2/6">Event name</BoldLabel>
            <Label>{detailData?.event?.name}</Label>
          </Section>
          <Section>
            <BoldLabel className="w-2/6">Proposed dates</BoldLabel>
            <div className="flex flex-col gap-y-2">
              {detailData?.proposedDates?.map((date: string) => (
                <Label>{moment(new Date(date)).format("DD-MM-YYYY")}</Label>
              ))}
            </div>
          </Section>
          <Section>
            <BoldLabel className="w-2/6">Proposed location</BoldLabel>
            <Label>
              {detailData?.proposedLocation?.postalCode},{" "}
              {detailData?.proposedLocation?.streetName}
            </Label>
          </Section>
          <Section>
            <BoldLabel className="w-2/6">Status</BoldLabel>
            <Label>
              {
                <Tag
                  color={
                    detailData.status == "Pending"
                      ? COLORS["amber-orange"]
                      : detailData.status == "Approved"
                      ? COLORS["sea-green"]
                      : COLORS["red"]
                  }
                  key={detailData.status}
                >
                  {detailData.status}
                </Tag>
              }
            </Label>
          </Section>
          {detailData.status == "Rejected" && (
            <Section>
              <BoldLabel className="w-2/6">Remarks</BoldLabel>
              <Label>{detailData.remarks}</Label>
            </Section>
          )}
          {detailData.status == "Approved" && (
            <Section>
              <BoldLabel className="w-2/6">Confirmed Date</BoldLabel>
              <Label>
                {moment(new Date(detailData.confirmedDateByVendor)).format(
                  "DD-MM-YYYY"
                )}
              </Label>
            </Section>
          )}

          {detailData.status == "Pending" &&
            authContext?.userData.userType == "Vendor" && (
              <div className="flex gap-10">
                <div className="flex gap-2 ">
                  <CustomButton
                    primaryColor={COLORS["sea-green"]}
                    textColor={COLORS["white"]}
                    type="primary"
                    onClick={() => clickApproveOrReject("approve")}
                    size="middle"
                    isLoading={false}
                    tooltip="Approve"
                  >
                    <TextWithIcon
                      text={"Approve"}
                      textColor={COLORS["white"]}
                      iconColor={COLORS["white"]}
                      Icon={FaCheck}
                    />
                  </CustomButton>
                  <CustomButton
                    primaryColor={COLORS["red"]}
                    textColor={COLORS["white"]}
                    type="primary"
                    onClick={() => clickApproveOrReject("reject")}
                    size="middle"
                    isLoading={false}
                    tooltip="Reject"
                  >
                    <TextWithIcon
                      text={"Reject"}
                      textColor={COLORS["white"]}
                      iconColor={COLORS["white"]}
                      Icon={IoCloseOutline}
                    />
                  </CustomButton>
                </div>
              </div>
            )}
        </div>
      </BaseModal>
      <ApproveWellnessEventModal
        isOpen={isOpenApproveModal}
        setIsOpen={setIsOpenApproveModal}
        proposedDates={detailData.proposedDates}
        onOk={handleApproveOrReject}
        isLoading={changeWellnessEventStatus.isPending}
      />
      <RejectWellnessEventModal
        isOpen={isOpenRejectedModal}
        setIsOpen={setIsOpenRejectedModal}
        onOk={handleApproveOrReject}
        isLoading={changeWellnessEventStatus.isPending}
      />
    </>
  );
};

export default DetailWellnessEventModal;
