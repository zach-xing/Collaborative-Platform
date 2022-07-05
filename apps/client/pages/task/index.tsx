import React from "react";
import { Box, Paper, Card } from "@mui/material";
import { Container, Draggable } from "react-smooth-dnd";

const tmpList = [
  {
    id: 0,
    name: "重要且紧急",
    children: [
      {
        label: "one-111",
      },
      {
        label: "one-222",
      },
    ],
  },
  {
    id: 1,
    name: "重要不紧急",
    children: [
      {
        label: "two-111",
      },
      {
        label: "two-222",
      },
    ],
  },
  {
    id: 2,
    name: "紧急不重要",
    children: [
      {
        label: "three-111",
      },
    ],
  },
  {
    id: 3,
    name: "不重要不紧急",
    children: [
      {
        label: "four-111",
      },
    ],
  },
];

interface ITaskItem {
  title: string;
}

const ContainerBox: any = Container;
const DraggableBox: any = Draggable;

// 作用就是进行某一列的真实操作（比如删除、增加）
const applyDrag = (
  arr: Array<{ label: string }>,
  dropResult: any
): Array<{ label: string }> => {
  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex - 1, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex - 1, 0, itemToAdd);
  }

  return result;
};

/**
 * 任务页面
 */
const Task = () => {
  const [data, setData] = React.useState<any>(tmpList);

  const onDrop = (id: number, dropResult: any) => {
    let { removedIndex, addedIndex } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      const tmpArr: Array<{
        id: number;
        name: string;
        children: Array<{ label: string }>;
      }> = [...data];
      const column = tmpArr.filter((item) => item.id === id)[0];
      const columnIdx = tmpArr.indexOf(column);

      tmpArr[columnIdx].children = applyDrag(column.children, dropResult);

      setData(tmpArr);
    }
  };

  const getCardPayload = (id: number, index: number) => {
    return data.filter((p: any) => p.id === id)[0].children[index - 1];
  };

  return (
    <Box sx={{ display: "flex" }}>
      {data.map((item: { id: number; name: string; children: any[] }) => (
        <Paper key={item.id} sx={{ p: 3, pt: 0, mr: 3 }}>
          <ContainerBox
            onDrop={(e: any) => onDrop(item.id, e)}
            getChildPayload={(idx: number) => getCardPayload(item.id, idx)}
            groupName="col"
            dropPlaceholderAnimationDuration={200}
          >
            <h3>{item.name}</h3>
            {item.children.map((column: any) => (
              <DraggableBox key={column?.label}>
                <Card>{column?.label}</Card>
              </DraggableBox>
            ))}
          </ContainerBox>
        </Paper>
      ))}
    </Box>
  );
};

export default Task;
