import React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Typography, Card, Button } from "@douyinfe/semi-ui";
import { IconMore, IconPlus } from "@douyinfe/semi-icons";

import styles from "./index.module.scss";

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
      {
        label: "one-331",
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
    <Card bodyStyle={{ display: "flex" }}>
      {data.map((item: { id: number; name: string; children: any[] }) => (
        <div key={item.id} className={styles.column}>
          <ContainerBox
            onDrop={(e: any) => onDrop(item.id, e)}
            getChildPayload={(idx: number) => getCardPayload(item.id, idx)}
            groupName="col"
            dropPlaceholderAnimationDuration={200}
          >
            <div className={styles.title}>
              <Typography.Title heading={4} style={{ marginBottom: 10 }}>
                {item.name}
              </Typography.Title>
              <Button icon={<IconPlus />} />
            </div>

            {item.children.map((column: any) => (
              <DraggableBox key={column.label}>
                <Card className={styles.cardStyle}>
                  <div>
                    <Typography.Title heading={6}>
                      {column?.label}
                    </Typography.Title>
                    <Button icon={<IconMore />} />
                  </div>
                  <Typography>adjective</Typography>
                </Card>
              </DraggableBox>
            ))}
          </ContainerBox>
        </div>
      ))}
    </Card>
  );
};

export default Task;
