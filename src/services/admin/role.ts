// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function queryRoleList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.Role[];
  }>('/api/yan-admin/v1/role/list', {
    method: 'GET',
    ...(options || {}),
  });
}
