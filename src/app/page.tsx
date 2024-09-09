"use client";
import React, { useState, useContext, useMemo, useEffect } from "react";
import { Layout, Table, TableProps, Tooltip, Tag } from "antd";
import { BoldLabel } from "@/components/Typography";
import CustomButton from "@/components/CustomButton";
import TextWithIcon from "@/components/TextWithIcon";
import { FaRegEye } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { COLORS } from "@/utils/theme";
import AddWellnessEventModal from "@/components/Modal/AddWellnessEventModal";
import DetailWellnessEventModal from "@/components/Modal/DetailWellnessEventModal";
import { useGetWellnessEvent } from "@/hooks/react-query/wellness-event";
import moment from "moment";
import { ICON_SIZE } from "@/utils/static";
import Header from "@/components/Header";
import { useAuthContext } from "@/providers/authProvider";

const { Content } = Layout;

interface Datatype {
  key: string;
  companyName: string;
  eventName: string;
  vendorName: string;
  confirmedDate: Date;
  status: string;
  createdDate: Date;
}

export default function Home() {
  const authContext = useAuthContext();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [detailWellnessEvent, setDetailWellnessEvent] = useState<any>({});

  const {
    data: wellnessEvent,
    isLoading: isLoadingWellnessEvent,
    isError: isErrorWellnessEvent,
    isRefetching: isRefetchingWellnessEvent,
  } = useGetWellnessEvent();

  const columns: TableProps<Datatype>["columns"] = [
    {
      title: "Company name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Vendor name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Event name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: string) => {
        let color =
          value == "Pending"
            ? COLORS["amber-orange"]
            : value == "Approved"
            ? COLORS["sea-green"]
            : COLORS["red"];
        return (
          <Tag color={color} key={value}>
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Created date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (value: string) => moment(new Date(value)).format("DD-MM-YYYY"),
    },
    {
      title: "Confirmed date",
      dataIndex: "confirmedDate",
      key: "confirmedDate",
      render: (value: string) =>
        value ? moment(new Date(value)).format("DD-MM-YYYY") : "",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: (value: any, record: any) => (
        <div className="flex items-center gap-4">
          <Tooltip title="View">
            <FaRegEye
              className="cursor-pointer"
              size={ICON_SIZE}
              color={COLORS["grey-text"]}
              onClick={() => onClickView(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const tableData = useMemo(() => {
    if (
      !isLoadingWellnessEvent &&
      !isErrorWellnessEvent &&
      !isRefetchingWellnessEvent
    ) {
      return wellnessEvent.data.map((data: any) => ({
        id: data.id,
        companyName: data.company.name,
        eventName: data.event.name,
        vendorName: data.vendor.name,
        confirmedDate: data.confirmedDateByVendor,
        status: data.status,
        createdDate: data.createdAt,
      }));
    } else {
      return [];
    }
  }, [isLoadingWellnessEvent, isErrorWellnessEvent, isRefetchingWellnessEvent]);

  const onClickView = (id: string) => {
    const clickedWellnessEvent = wellnessEvent.data.filter(
      (data: any) => data.id == id
    );
    if (clickedWellnessEvent.length > 0) {
      setDetailWellnessEvent(clickedWellnessEvent[0]);
      setIsOpenDetailModal(true);
    }
  };

  useEffect(() => {
    if (
      !isLoadingWellnessEvent &&
      !isErrorWellnessEvent &&
      !isRefetchingWellnessEvent &&
      detailWellnessEvent &&
      Object.keys(detailWellnessEvent).length > 0
    ) {
      const newDetailWellnessEvent = wellnessEvent.data.filter(
        (data: any) => data.id == detailWellnessEvent.id
      );
      if (newDetailWellnessEvent.length > 0) {
        setDetailWellnessEvent(newDetailWellnessEvent[0]);
      }
    }
  }, [
    isLoadingWellnessEvent,
    isErrorWellnessEvent,
    isRefetchingWellnessEvent,
    detailWellnessEvent,
  ]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header />
      <Content style={{ padding: "30px 180px" }}>
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <BoldLabel className="text-xl">Wellness Events</BoldLabel>
            {authContext?.userData.userType == "HR" && (
              <CustomButton
                primaryColor={COLORS["primary-blue"]}
                textColor={COLORS["white"]}
                type="primary"
                onClick={() => setIsOpenAddModal(true)}
                size="middle"
                isLoading={false}
              >
                <TextWithIcon
                  text={"New wellness event"}
                  textColor={COLORS["white"]}
                  iconColor={COLORS["white"]}
                  Icon={CiCirclePlus}
                />
              </CustomButton>
            )}
          </div>
          <Table dataSource={tableData} columns={columns} pagination={false} />
        </div>
      </Content>
      <AddWellnessEventModal
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
      />
      <DetailWellnessEventModal
        isOpen={isOpenDetailModal}
        setIsOpen={setIsOpenDetailModal}
        detailData={detailWellnessEvent}
      />
    </Layout>
  );
}
