// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET /api/currentUser */
export async function queryClientPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.ClientListItem>;
  }>('/api/admin/v1/oauthClient/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function remove(id: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/oauthClient/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新 PUT */
export async function update(
  id: string,
  params: API.ClientListItem,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/oauthClient/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 保存 POST */
export async function save(params: API.ClientListItem, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/oauthClient`, {
    method: 'POST',
    ...(options || {}),
  });
}
