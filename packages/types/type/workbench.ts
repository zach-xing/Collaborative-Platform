/** 审批中的数据类型 */
export interface IApproval {
  id: string;
  title: string;
  state: "agree" | "reject" | "pending";
  desc: string;
}
