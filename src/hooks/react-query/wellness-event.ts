import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as wellnessEventService from "@/services/wellness-event";
import { reactQueryKey } from "@/utils/static";
import { message } from "antd";

export function useCreateWellnessEvent({
  onMutationFailed,
  onMutationSuccess,
}: MutationPropTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wellnessEventService.createWellnessEvent,
    onSuccess: (data) => {
      onMutationSuccess(data);
      message.success("wellness event saved successfully");
      queryClient.invalidateQueries({
        queryKey: reactQueryKey.wellnessEvent,
      });
    },
    onError: (error: any) => {
      message.error(error.response.data.errors.join("\n"));
      onMutationFailed(error);
      console.error("There was an error creating wellness event");
    },
  });
}

export function useGetWellnessEvent() {
  return useQuery({
    queryKey: reactQueryKey.wellnessEvent,
    queryFn: () => wellnessEventService.getWellnessEvent(),
  });
}

export function useChangeWellnessEventStatus({
  onMutationFailed,
  onMutationSuccess,
}: MutationPropTypes) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wellnessEventService.changeWellnessEventStatus,
    onSuccess: (data) => {
      onMutationSuccess(data);
      message.success("wellness event status changed successfully");
      queryClient.invalidateQueries({
        queryKey: reactQueryKey.wellnessEvent,
      });
    },
    onError: (error: any) => {
      message.error(error.response.data.errors.join("\n"));
      onMutationFailed(error);
      console.error("There was an error creating wellness event");
    },
  });
}
