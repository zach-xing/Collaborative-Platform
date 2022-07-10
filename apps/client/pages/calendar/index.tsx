import { IconChevronLeft, IconChevronRight } from "@douyinfe/semi-icons";
import {
  Row,
  Col,
  Calendar,
  Card,
  Button,
  Typography,
  Select,
} from "@douyinfe/semi-ui";
import React from "react";
import CalendarCreateModal from "../../components/CalendarCreateModal";

import styles from "./index.module.scss";

const dailyEventStyle: any = {
  borderRadius: "3px",
  boxSizing: "border-box",
  border: "var(--semi-color-primary) 1px solid",
  padding: "10px",
  backgroundColor: "var(--semi-color-primary-light-default)",
  height: "100%",
  overflow: "hidden",
};
const allDayStyle: any = {
  borderRadius: "3px",
  boxSizing: "border-box",
  border: "var(--semi-color-bg-1) 1px solid",
  padding: "2px 4px",
  backgroundColor: "var(--semi-color-primary-light-active)",
  height: "100%",
  overflow: "hidden",
};

const displayValue = new Date(2022, 7, 23, 8, 32, 0);

type TMode = "week" | "day" | "month";

/**
 * 日历 页面
 */
const CalendarPage = () => {
  const [createVisible, setCreateVisible] = React.useState(false);
  const [mode, setMode] = React.useState<TMode>("month");

  // 开始和结束时间在同一天时判断，不在mount视图就用 dailyEventStyle
  const dailyStyle = mode === "month" ? allDayStyle : dailyEventStyle;
  const events = [
    {
      key: "0",
      start: new Date(2022, 5, 25, 14, 45, 0),
      end: new Date(2022, 6, 26, 6, 18, 0),
      children: <div style={allDayStyle}>6月25日 14:45 ~ 7月26日 6:18</div>,
    },
    {
      key: "1",
      start: new Date(2022, 6, 18, 10, 0, 0),
      end: new Date(2022, 6, 30, 8, 0, 0),
      children: <div style={allDayStyle}>7月18日 10:00 ~ 7月30日 8:00</div>,
    },
    {
      key: "2",
      start: new Date(2022, 6, 19, 20, 0, 0),
      end: new Date(2022, 6, 23, 14, 0, 0),
      children: <div style={allDayStyle}>7月19日 20:00 ~ 7月23日 14:00</div>,
    },
    {
      key: "3",
      start: new Date(2022, 6, 21, 6, 0, 0),
      end: new Date(2022, 6, 25, 6, 0, 0),
      children: <div style={allDayStyle}>7月21日 6:00 ~ 7月25日 6:00</div>,
    },
    {
      key: "4",
      allDay: true,
      start: new Date(2022, 6, 22, 8, 0, 0),
      children: <div style={allDayStyle}>7月22日 全天</div>,
    },
    {
      key: "5",
      start: new Date(2022, 6, 22, 9, 0, 0),
      end: new Date(2022, 6, 23, 23, 0, 0),
      children: <div style={allDayStyle}>7月22日 9:00 ~ 7月23日 23:00</div>,
    },
    {
      key: "6",
      start: new Date(2022, 6, 23, 8, 32, 0),
      children: <div style={dailyStyle}>7月23日 8:32</div>,
    },
    {
      key: "7",
      start: new Date(2022, 6, 23, 14, 30, 0),
      end: new Date(2022, 6, 23, 20, 0, 0),
      children: <div style={dailyStyle}>7月23日 14:30-20:00</div>,
    },
    {
      key: "8",
      start: new Date(2022, 6, 25, 8, 0, 0),
      end: new Date(2022, 6, 27, 6, 0, 0),
      children: <div style={allDayStyle}>7月25日 8:00 ~ 7月27日 6:00</div>,
    },
    {
      key: "9",
      start: new Date(2022, 6, 26, 10, 0, 0),
      end: new Date(2022, 6, 27, 16, 0, 0),
      children: <div style={allDayStyle}>7月26日 10:00 ~ 7月27日 16:00</div>,
    },
  ];

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col span={24} style={{ height: "100%" }}>
          <Card
            title={
              <div style={{ display: "flex" }}>
                <Typography.Title heading={4} style={{ marginRight: 10 }}>
                  日历
                </Typography.Title>
                <Button onClick={() => setCreateVisible(true)}>创建日程</Button>
              </div>
            }
            style={{ height: "100%" }}
            bodyStyle={{ height: "calc(100% - 64px - 20px)" }}
            headerExtraContent={
              <div className={styles.cardExtra}>
                <div className={styles.option}>
                  <Button icon={<IconChevronLeft />} />
                  <Button icon={<IconChevronRight />} />
                </div>

                <Select
                  defaultValue={mode}
                  style={{ width: 120 }}
                  onSelect={(value) => setMode(value as TMode)}
                >
                  <Select.Option value="day">日视图</Select.Option>
                  <Select.Option value="week">周视图</Select.Option>
                  <Select.Option value="month">月视图</Select.Option>
                </Select>
              </div>
            }
          >
            <Calendar
              height={"100%"}
              mode={mode}
              // displayValue={displayValue}
              events={events}
            ></Calendar>
          </Card>
        </Col>
      </Row>

      <CalendarCreateModal
        visible={createVisible}
        setVisible={setCreateVisible}
      />
    </>
  );
};

export default CalendarPage;
