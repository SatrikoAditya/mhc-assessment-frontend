"use client";
import React, { useMemo, useState } from "react";
import BaseModal from "./BaseModal";
import Section from "../Section";
import { Divider, Input, DatePicker, Select } from "antd";
import { BoldLabel } from "../Typography";
import { useCreateWellnessEvent } from "@/hooks/react-query/wellness-event";
import { useGetVendors } from "@/hooks/react-query/vendor";
import { useAuthContext } from "@/providers/authProvider";

interface AddWellnessEventModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CreateWellnessEventParams {
  company: string;
  vendor: string;
  proposedDates: Date[];
  postalCode?: string;
  streetName?: string;
  event: string;
  status: "Approved" | "Pending" | "Rejected";
}

const AddWellnessEventModal: React.FC<AddWellnessEventModal> = ({
  isOpen,
  setIsOpen,
}) => {
  const authContext = useAuthContext();
  const [wellnessEvent, setWellnessEvent] = useState<CreateWellnessEventParams>(
    {
      company: authContext?.userData.company?.id || "",
      vendor: "",
      proposedDates: [],
      postalCode: "",
      streetName: "",
      event: "",
      status: "Pending",
    }
  );

  const {
    data: vendors,
    isLoading: isLoadingVendors,
    isError: isErrorVendors,
  } = useGetVendors();

  const createWellnessEvent = useCreateWellnessEvent({
    onMutationFailed: () => {},
    onMutationSuccess: () => {
      setWellnessEvent({
        company: authContext?.userData.company?.id || "",
        vendor: "",
        proposedDates: [],
        postalCode: "",
        streetName: "",
        event: "",
        status: "Pending",
      });
      setIsOpen(false);
    },
  });

  const vendorOptions = useMemo(() => {
    if (!isLoadingVendors && !isErrorVendors) {
      return vendors.data.map((vendor: any) => ({
        value: vendor.id,
        label: vendor.name,
      }));
    } else {
      return [];
    }
  }, [isLoadingVendors, isErrorVendors]);

  const eventOptions = useMemo(() => {
    if (wellnessEvent.vendor) {
      return vendors.data
        .filter((vendor: any) => vendor.id == wellnessEvent.vendor)[0]
        .vendorTags.map((tag: any) => ({
          value: tag.id,
          label: tag.name,
        }));
    } else {
      return [];
    }
  }, [wellnessEvent.vendor]);

  const onChangeValue = (name: string, value: string | Date | Date[]) => {
    setWellnessEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      await createWellnessEvent.mutateAsync({
        ...wellnessEvent,
        proposedLocation: {
          postalCode: wellnessEvent.postalCode,
          streetName: wellnessEvent.streetName,
        },
        postalCode: undefined,
        streetName: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseModal
      minWidth={"45vw"}
      isLoading={createWellnessEvent.isPending}
      title={
        <div className="flex flex-col gap-4">
          <BoldLabel className="text-xl">Add new wellness event</BoldLabel>
          <Divider type="horizontal" className="m-1 bg-divider-color" />
        </div>
      }
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => onSubmit()}
    >
      <div className="w-full flex flex-col gap-6">
        <Section>
          <BoldLabel className="w-2/6">Company name</BoldLabel>
          <Input
            placeholder="Company name"
            name="companyName"
            className="w-full"
            value={authContext?.userData.company?.name}
            disabled
          />
        </Section>
        <Section>
          <BoldLabel className="w-2/6">Event name</BoldLabel>
          <Select
            showSearch
            optionFilterProp="label"
            options={eventOptions}
            value={wellnessEvent.event}
            onChange={(value) => onChangeValue("event", value)}
            className="w-full"
          />
        </Section>
        <Section>
          <BoldLabel className="w-2/6">Propose dates</BoldLabel>
          <DatePicker
            multiple
            className="w-full"
            maxTagCount="responsive"
            size="small"
            value={wellnessEvent.proposedDates}
            onChange={(value) => onChangeValue("proposedDates", value)}
          />
        </Section>
        <Section>
          <BoldLabel className="w-2/6">Postal code</BoldLabel>
          <Input
            onChange={(event) =>
              onChangeValue(event.target.name, event.target.value)
            }
            placeholder="Postal code"
            className="w-full"
            value={wellnessEvent.postalCode}
            name="postalCode"
          />
        </Section>
        <Section>
          <BoldLabel className="w-2/6">Street name</BoldLabel>
          <Input
            onChange={(event) =>
              onChangeValue(event.target.name, event.target.value)
            }
            placeholder="Street name"
            className="w-full"
            value={wellnessEvent.streetName}
            name="streetName"
          />
        </Section>
      </div>
    </BaseModal>
  );
};

export default AddWellnessEventModal;
