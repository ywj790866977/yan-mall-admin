// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET */
export async function queryGoodsPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.GoodsListItem>;
  }>('/api/goods-admin/v1/goods/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
