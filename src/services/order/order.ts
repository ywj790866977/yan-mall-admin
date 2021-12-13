// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET */
export async function queryOrderPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.OrderListItem>;
  }>('/api/order/admin/v1/order/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
