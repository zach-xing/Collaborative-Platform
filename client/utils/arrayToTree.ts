/**
 * 将数组形式转换成树型结构
 */
export default function arrayToTree(arr: Array<any>) {
  const result = [];
  const tmpMap: any = {};

  for (const item of arr) {
    const id = item.id;
    const pid = item.parendId;

    // 若 tmpMap[id] 不存在，则创建一个含有 children 的对象
    if (!tmpMap[id]) {
      tmpMap[id] = {
        children: [],
      };
    }

    tmpMap[id] = {
      ...item,
      children: tmpMap[id]["children"],
    };

    const treeItem = tmpMap[id];

    // 约束 pid 若为 0，则说明此项为顶部
    if (pid === "0") {
      result.push(treeItem);
    } else {
      if (!tmpMap[pid]) {
        tmpMap[pid] = {
          children: [],
        };
      }
      tmpMap[pid].children.push(treeItem);
    }
  }

  return result;
}
