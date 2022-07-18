/** 审批中的数据类型 */
export interface IApproval {
  id: string;
  type: number;
  state: "agree" | "reject" | "pending";
  startTime: string;
  endTime: string;
  reason: string;
}

/** report 数据类型 */
export interface IReport {
  id: string;
  title: string;
  curReport: string;
  prevReport: string;
  otherReport: string;
  sendTime: string;
  type: "day" | "week" | "month";
}
