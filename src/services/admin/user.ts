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

/** 新增用户 */
export async function saveUser(params: API.User, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>('/api/yan-admin/v1/user', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 更新用户 */
export async function updateUser(id: number, params: API.User, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/yan-admin/v1/user/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
