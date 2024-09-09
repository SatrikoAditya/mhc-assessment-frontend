import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as userService from "@/services/user";
import { reactQueryKey } from "@/utils/static";

export function useUserLogin({
  onMutationFailed,
  onMutationSuccess,
}: MutationPropTypes) {
  return useMutation({
    mutationFn: userService.userLogin,
    onSuccess: (data) => {
      onMutationSuccess(data);
    },
    onError: (data) => {
      onMutationFailed(data);
    },
  });
}
