// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 分页查询 */
export async function queryPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.UserListItem>;
  }>('/api/yan-admin/v1/user/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
