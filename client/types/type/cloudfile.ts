import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree/interface";

/**
 * 实际上就是 {key, label, type, children} 这几个属性
 */
export interface ICloudFile extends TreeNodeData {
  type: "folder" | "file";
  children?: ICloudFile[];
}
