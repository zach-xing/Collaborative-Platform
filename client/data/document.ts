import { Toast } from "@douyinfe/semi-ui";
import { useQuery } from "react-query";
import { IDocument } from "../types";
import request from "../utils/request";

function fetchDocument(id: string) {
  return request({
    url: `/document/${id}`,
    method: "GET",
  });
}
/**
 * 获取指定 id 文档
 * @param id 文档 id
 */
export function useFetchDocument(id: string) {
  const { data, isLoading } = useQuery<IDocument>("", () => fetchDocument(id), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    initialData: {
      id: "",
      title: "获取文档中...",
      text: "{}",
      collaborators: "",
      updateTime: new Date(),
      version: "-1",
      ownerId: "",
      collaboratorArr: [],
    },
    onError: (err: any) => {
      Toast.error(err?.message || "获取文档失败");
    },
  });

  /**
   * 保存文档
   * @param id 文档 id
   * @param text 文档的内容
   */
  const saveDocument = (id: string, text: string) => {
    return request({
      url: `/document/${id}`,
      method: "POST",
      data: {
        text: text,
      },
    });
  };

  return {
    documentData: data,
    isLoading,
    saveDocument,
  };
}

/**
 * 发送“邀请别人”的请求
 * @param data id userIds
 */
export function addCollaborator(data: { id: string; userIds: string }) {
  return request({
    url: "/document/collaborator",
    method: "POST",
    data,
  });
}
