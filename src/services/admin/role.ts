// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询角色 GET /api/currentUser */
export async function queryRoleList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.Role[];
  }>('/api/admin/v1/role/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页查询 */
export async function queryPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.RoleListItem>;
  }>('/api/admin/v1/role/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增 */
export async function saveRole(params: API.Role, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>('/api/admin/v1/role', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 更新 */
export async function updateRole(id: number, params: API.Role, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/role/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function remove(id: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/role/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新状态 PUT */
export async function updateStatus(id: string, status: number, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/role/updateStatus/${id}`, {
    method: 'PUT',
    data: {
      status,
    },
    ...(options || {}),
  });
}
