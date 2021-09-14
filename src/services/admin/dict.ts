// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 分页查询 */
export async function queryDictPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.DictListItem>;
  }>('/api/yan-admin/v1/dict/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
