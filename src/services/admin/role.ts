// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function queryDeptList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.Role[];
  }>('/api/yan-admin/v1/dept/list', {
    method: 'GET',
    ...(options || {}),
  });
}
