import axios from "@/utils/axios";

export const createWellnessEvent = async (data: any) => {
  const result = await axios.post("wellness-event", data);
  return result.data;
};

export const getWellnessEvent = async () => {
  const result = await axios.get("wellness-event");
  return result.data;
};

export const changeWellnessEventStatus = async ({
  id,
  status,
  remarks,
  confirmedDate,
}: {
  id: string;
  status: "Pending" | "Approved" | "Rejected";
  confirmedDate?: Date | null;
  remarks?: string | null;
}) => {
  const result = await axios.put(`wellness-event/approval/${id}`, {
    status,
    confirmedDate,
    remarks,
  });

  return result.data;
};
