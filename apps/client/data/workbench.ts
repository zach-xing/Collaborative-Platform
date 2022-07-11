import request from "../utils/request";

/**
 * 发送请假的申请
 * @param data
 */
export function sendLeaveApplication(data: {
  type: string;
  startTime: string;
  endTime: string;
  reason: string;
}) {
  return request({
    url: "/workbench/leave",
    method: "POST",
    data,
  });
}

/**
 * 发送加班的申请
 */
export function sendOvertimeApplication(data: {
  startTime: string;
  endTime: string;
  reason: string;
}) {
  return request({
    url: "/workbench/overtime",
    method: "POST",
    data,
  });
}

/**
 * 发送外出的申请
 * @param data 
 */
export function sendOutsideApplication(data: {
  startTime: string;
  endTime: string;
  reason: string;
}) {
  return request({
    url: "/workbench/outside",
    method: "POST",
    data,
  });
}
