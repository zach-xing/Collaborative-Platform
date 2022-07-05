import React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { MdFolder, MdFolderOpen, MdInsertDriveFile } from "react-icons/md";
import { Box, Typography } from "@mui/material";
import ScrollBox from "../../components/ScrollBox";
import FolderShow from "./components/FolderShow";
import { CustomTreeItem } from "./clouddocument.style";

type folderType = {
  id: string;
  label: string;
  type: "file" | "folder";
  children?: folderType[];
};

const mockData: Array<folderType> = [
  {
    id: "1",
    type: "folder",
    label: "文件1",
    children: [
      { id: "1-1", type: "file", label: "文件1-1" },
      { id: "1-2", type: "file", label: "文件1-2" },
    ],
  },
  {
    id: "2",
    type: "folder",
    label: "文件2",
    children: [{ id: "2-1", type: "file", label: "文件2-2" }],
  },
];

const renderNode = (data: folderType) => {
  if (data.children) {
    return (
      <CustomTreeItem key={data.id} nodeId={data.id} label={data.label}>
        {data.children.map((col) => renderNode(col))}
      </CustomTreeItem>
    );
  } else {
    return (
      <TreeItem
        key={data.id}
        nodeId={data.id}
        label={data.label}
        icon={<MdInsertDriveFile />}
      />
    );
  }
};

/**
 * 云文档
 */
const Clouddocument = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          flex: 2,
          p: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ flex: 1 }} variant="h6">
          云文档
        </Typography>

        <ScrollBox sx={{ flex: 14 }}>
          <TreeView
            defaultCollapseIcon={<MdFolderOpen />}
            defaultExpandIcon={<MdFolder />}
          >
            {mockData.map((column) => renderNode(column))}
          </TreeView>
        </ScrollBox>
      </Box>

      <Box sx={{ flex: 8, p: 1, pl: 3 }}>
        <FolderShow />
      </Box>
    </Box>
  );
};

export default Clouddocument;
