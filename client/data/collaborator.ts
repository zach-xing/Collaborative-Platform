import request from "../utils/request";

/**
 * 发送“邀请别人”的请求
 * @param data id userIds
 */
export function addCollaborator(data: { id: string; userIds: string }) {
  return request({
    url: "/collaborator",
    method: "POST",
    data,
  });
}
