import {request} from "@@/plugin-request/request";
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings";

/** 获取路由信息 GET /api/getRouters */
export async function getRouters(options?: { [key: string]: any }) {
  return request<{ data: MenuDataItem[]; }>('/api/v1/menu/routes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
