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

/** 分页查询 */
export async function queryPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.UserListItem>;
  }>('/api/yan-admin/v1/role/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增 */
export async function saveRole(params: API.User, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>('/api/yan-admin/v1/role', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 更新 */
export async function updateRole(id: number, params: API.User, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/yan-admin/v1/role/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
