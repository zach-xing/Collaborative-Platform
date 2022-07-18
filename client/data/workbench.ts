import { useQuery } from "react-query";
import { IApproval, IReport } from "../types";
import request from "../utils/request";

/**
 * 发送申请（请假、加班、外出）
 */
export function sendApplication(
  id: string,
  data: {
    type: number;
    startTime: string;
    endTime: string;
    reason: string;
  }
) {
  return request({
    url: `/approval/${id}`,
    method: "POST",
    data,
  });
}

function fetchApprovalData(id: string) {
  return request({
    url: `/approval/${id}`,
    method: "GET",
  });
}
/**
 * 获取审批的数据
 */
export function useFetchApprovalData(id: string) {
  const { data, isLoading } = useQuery<Array<IApproval>>(
    "ApprovalData",
    () => fetchApprovalData(id),
    {
      refetchInterval: false,
    }
  );

  return {
    approvalData: data,
    isLoading,
  };
}

/**
 * 发送汇报
 */
export function sendReport(
  id: string,
  type: "day" | "week" | "month",
  data: {
    title: string;
    curReport: string;
    prevReport: string;
    otherReport: string;
  }
) {
  return request({
    url: `/report/${id}`,
    method: "POST",
    data: { ...data, type, sendTime: new Date() },
  });
}

function fetchReport(id: string) {
  return request({
    url: `/report/${id}`,
    method: "GET",
  });
}
/**
 * 获取 report 的信息
 * @Param id 用户的 id
 */
export function useFetchReport(id: string) {
  const { data, isLoading } = useQuery<Array<IReport>>(
    "fetchReport",
    () => fetchReport(id),
    {
      refetchInterval: false,
    }
  );

  return {
    reportData: data,
    isLoading,
  };
}
