// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET */
export async function queryBrandPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.BrandListItem>;
  }>('/api/goods-admin/v1/brand/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
