import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as vendorService from "@/services/vendor";
import { reactQueryKey } from "@/utils/static";
import { message } from "antd";

export function useGetVendors() {
  return useQuery({
    queryKey: reactQueryKey.vendors,
    queryFn: vendorService.getVendors,
  });
}
