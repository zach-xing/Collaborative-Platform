import React from "react";
import { Box } from "@mui/material";
import { Container, Draggable } from "react-smooth-dnd";

const list = [
  { label: "第一个数据", fieldName: "data-a1", children: [] },
  { label: "第二个数据", fieldName: "data-a2", children: [] },
  { label: "第三个数据", fieldName: "data-a3", children: [] },
];

const ContainerBox: any = Container;
const DraggableBox: any = Draggable;

/**
 * 任务页面
 */
const Task = () => {
  const [data, setData] = React.useState<any[]>(list);

  const onDrag = (arr: any[] = [], dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) {
      return arr;
    }
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  };

  const onDrop = (dropResult: any) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      const list = onDrag(data as Array<any>, dropResult);
      setData(list);
    }
  };

  return (
    <Box>
      <ContainerBox onDrop={onDrop} groupName="a">
        {data.map((item) => (
          <DraggableBox key={item.label}>
            <div>{item.label}</div>
          </DraggableBox>
        ))}
      </ContainerBox>

      <ContainerBox onDrop={onDrop} groupName="a">
        {data.map((item) => (
          <DraggableBox key={item.label}>
            <div>{item.label}</div>
          </DraggableBox>
        ))}
      </ContainerBox>
    </Box>
  );
};

export default Task;
