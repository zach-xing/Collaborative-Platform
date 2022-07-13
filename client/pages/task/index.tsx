import React from "react";
import { Typography, Card, Button } from "@douyinfe/semi-ui";
import { IconMore, IconPlus } from "@douyinfe/semi-icons";
import TaskCreateModal from "../../components/TaskCreateModal";
import TaskUpdateModal from "../../components/TaskUpdateModal";
import type { ITask } from "../../types";

import styles from "./index.module.scss";

const tmpList = [
  {
    id: "0",
    name: "重要且紧急",
    children: [
      {
        id: "111",
        taskName: "任务重要了",
        desc: "???",
        updateTime: "2022.7.8",
      },
      {
        id: "112",
        taskName: "任务重要了1",
        desc: "???",
        updateTime: "2022.7.8",
      },
      {
        id: "113",
        taskName: "任务重要了2",
        desc: "???",
        updateTime: "2022.7.8",
      },
    ],
  },
  {
    id: "1",
    name: "重要不紧急",
    children: [
      {
        id: "211",
        taskName: "任务重要了1",
        desc: "???",
        updateTime: "2022.7.8",
      },
      {
        id: "212",
        taskName: "任务重要了2",
        desc: "???12",
        updateTime: "2022.7.8",
      },
    ],
  },
  {
    id: "2",
    name: "紧急不重要",
    children: [
      {
        id: "311",
        taskName: "任务重要了",
        desc: "???",
        updateTime: "2022.7.8",
      },
    ],
  },
  {
    id: "3",
    name: "不重要不紧急",
    children: [
      {
        id: "411",
        taskName: "任务重要了",
        desc: "???",
        updateTime: "2022.7.8",
      },
    ],
  },
];

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
  const [visibleCreate, setVisibleCreate] = React.useState(false);
  const [visibleUpdate, setVisibleUpdate] = React.useState(false);
  const [createFlag, setCreateFlag] = React.useState("0");
  const [updateFlag, setUpdateFlag] = React.useState("0");
  const [curTask, setCurTask] = React.useState<ITask | null>(null); // 编辑时选中的 task
  const [data, setData] = React.useState<any>(tmpList);

  const onDrop = (id: string, dropResult: any) => {
    let { removedIndex, addedIndex } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      const tmpArr: Array<{
        id: string;
        name: string;
        children: Array<{ label: string }>;
      }> = [...data];
      const column = tmpArr.filter((item) => item.id === id)[0];
      const columnIdx = tmpArr.indexOf(column);

      tmpArr[columnIdx].children = applyDrag(column.children, dropResult);

      setData(tmpArr);
    }
  };

  const getCardPayload = (id: string, index: number) => {
    return data.filter((p: any) => p.id === id)[0].children[index - 1];
  };

  const handleCreate = (id: string) => {
    setCreateFlag(id);
    setVisibleCreate(true);
  };

  const handleUpdate = (id: string, column: ITask) => {
    // 这里参数id是四个板块其中一个id
    setUpdateFlag(id);
    setCurTask(column);
    setVisibleUpdate(true);
  };

  return (
    <>
      <Card bodyStyle={{ display: "flex" }}>
        sdf
      </Card>

      <TaskCreateModal
        visible={visibleCreate}
        setVisible={setVisibleCreate}
        flag={createFlag}
      />
      <TaskUpdateModal
        task={curTask}
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        flag={updateFlag}
      />
    </>
  );
};

export default Task;
