// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function queryPermissionPage(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.PermissionListItem>;
  }>('/api/admin/v1/permission/page', {
    method: 'GET',
    ...(options || {}),
  });
}
