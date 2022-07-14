import { useQuery } from "react-query";
import { IApproval, IReport } from "../types";
import request from "../utils/request";

/**
 * 发送申请（请假、加班、外出）
 */
export function sendApplication(data: {
  type: number;
  startTime: string;
  endTime: string;
  reason: string;
}) {
  return request({
    url: "/approval",
    method: "POST",
    data,
  });
}

function fetchApprovalData() {
  return request({
    url: "/approval",
    method: "GET",
  });
}
/**
 * 获取审批的数据
 */
export function useFetchApprovalData() {
  const { data, isLoading } = useQuery<{ list: Array<IApproval> }>(
    "ApprovalData",
    fetchApprovalData,
    {
      refetchInterval: false,
    }
  );

  return {
    approvalData: data?.list,
    isLoading,
  };
}

/**
 * 发送汇报
 */
export function sendReport(
  type: "day" | "week" | "month",
  data: {
    title: string;
    curReport: string;
    prevReport: string;
    otherReport: string;
  }
) {
  return request({
    url: `/report?type=${type}`,
    method: "POST",
    data,
  });
}

function fetchReport() {
  return request({
    url: "/report",
    method: "GET",
  });
}
/**
 * 获取 report 的信息
 */
export function useFetchReport() {
  const { data, isLoading } = useQuery<{
    list: Array<IReport>;
  }>("fetchReport", fetchReport, {
    refetchInterval: false,
  });

  return {
    reportData: data?.list,
    isLoading,
  };
}
