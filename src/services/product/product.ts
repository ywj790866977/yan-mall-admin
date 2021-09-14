// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET */
export async function queryProductPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.ClientListItem>;
  }>('/api/yan-admin/v1/product/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
