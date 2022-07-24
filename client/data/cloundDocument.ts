import { useQuery } from "react-query";
import { ICloudFile } from "../types";
import arrayToTree from "../utils/arrayToTree";
import request from "../utils/request";

function fetchFile(id: string) {
  return request({
    url: `/cloudfile/${id}`,
    method: "GET",
  });
}

/**
 * 获取文件的结构信息
 * @Param id 用户的 id
 */
export function useFetchFile(id: string) {
  const { data, isLoading, refetch } = useQuery<string>(
    "fetchFile",
    () => fetchFile(id),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );

  const fileData: Array<ICloudFile> = arrayToTree(JSON.parse(data || "[]"));

  /**
   * 创建文件
   * @param content 创建后的文件[夹]结构
   * @param createFile 若是创建的文件，需要 {id, title}
   */
  const createFile = async (data: { conten: string; createFile?: string }) => {
    await request({
      url: `/cloudfile/${id}`,
      method: "POST",
      data,
    });
    refetch();
  };

  /**
   * 更改文件
   * @param content 更改后的文件[夹]结构
   * @param updateFile 若是更改的文件，需要 {id, title}
   */
  const updateFile = async (data: { content: string; updateFile?: string }) => {
    await request({
      url: `/cloudfile/${id}`,
      method: "PATCH",
      data,
    });
    refetch();
  };

  /**
   * 删除文件
   * @param content 删除后的文件[夹]结构
   * @param deleteIds 需要删除的 file 的 id 列表（就是 key 的列表）
   */
  const deleteFile = async (data: {
    content: string;
    deleteIds?: Array<string>;
  }) => {
    await request({
      url: `/cloudfile/${id}`,
      method: "DELETE",
      data,
    });
    refetch();
  };

  return {
    fileData,
    isLoading,
    refetchFile: refetch,
    createFile,
    updateFile,
    deleteFile,
  };
}
