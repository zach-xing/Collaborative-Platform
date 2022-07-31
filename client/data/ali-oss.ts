import { Toast } from "@douyinfe/semi-ui";
import OSS from "ali-oss";
import dayjs from "dayjs";
import { OSSoptions } from "../env";

const client = new OSS(OSSoptions);

/**
 * 发送图片到 阿里云的 OSS 中
 * @param name
 * @param data
 */
export async function sendImgToOSS(name: string, data: any) {
  try {
    const updateName = dayjs(Date.now()).format("YYYY-MM-DD#hh:mm") + name;
    const result = await client.put(`zeekg-media/${updateName}`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    Toast.success("发送成功");
    return result;
  } catch (e) {
    Toast.error("发送失败");
  }
}
