import { useQuery } from "react-query";
import request from "../utils/requset";

function fetchApproval() {
  return request({
    url: "/approval",
    method: "GET",
  });
}

/**
 * 获取审批数据
 */
export function useFetchApproval() {
  const { data, refetch, isLoading } = useQuery("approval", fetchApproval, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
  const list = data?.map((v: any) => ({ ...v, key: v.id })) || [];
  return { list, refetch, isLoading };
}

/**
 * 更新数据
 */
export function updateApproval(id: string, state: string) {
  return request({
    url: `/approval/${id}`,
    method: "POST",
    data: { state },
  });
}
