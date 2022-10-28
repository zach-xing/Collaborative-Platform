import { useQuery } from "react-query";
import request from "../utils/requset";

function fetchReport() {
  return request({
    url: "/report",
    method: "GET",
  });
}

/**
 * 获取汇报数据
 */
export function useFetchReport() {
  const { data, refetch, isLoading } = useQuery("report", fetchReport, {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
  const list = data?.map((v: any) => ({ ...v, key: v.id })) || [];
  return { list, refetch, isLoading };
}
