import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree/interface";

export interface ICloudFile extends TreeNodeData {
  type: "folder" | "file";
  children?: ICloudFile[];
}
