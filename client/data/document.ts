import { Toast } from "@douyinfe/semi-ui";
import { useQuery } from "react-query";
import { ICDocument, IDocument } from "../types";
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

  /**
   * 获取文档的版本
   */
  const fetchDocumentVersion = () => {
    console.log('send request')
    return request({
      url: `/document/version/${id}`,
      method: "GET",
    });
  };

  return {
    documentData: data,
    isLoading,
    saveDocument,
    fetchDocumentVersion,
  };
}

function fetchCollaboratorDocument(id: string) {
  return request({
    url: `/document/collaborate/${id}`,
    method: "GET",
  });
}
/**
 * 根据用户 id 获取协作文档
 */
export function useFetchCollaboratorDocument(id: string) {
  const { data, refetch, isLoading } = useQuery<Array<ICDocument>>(
    "fetchCollaboratorDocument",
    () => fetchCollaboratorDocument(id),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        Toast.error(err.message || "获取协作文档失败");
      },
    }
  );

  return {
    cdocumentData: data,
    refetch,
    isLoading,
  };
}
